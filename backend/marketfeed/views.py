from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status, permissions, generics
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.viewsets import ViewSet
from .serializers import *
from .models import *
from drf_yasg.utils import swagger_auto_schema
import yfinance as yf
from concurrent.futures import ThreadPoolExecutor
from django.db.models import Q

from drf_spectacular.utils import extend_schema, OpenApiParameter
import requests
from rest_framework.views import APIView
from django.conf import settings

from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiTypes
from rest_framework.pagination import PageNumberPagination



class StockResultsSetPagination(PageNumberPagination):
    page_size = 20

    def get_page_size(self, request):
        return request.query_params.get('page_size', self.page_size)

class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        currencies = self.get_queryset()
        serializer = self.get_serializer(currencies, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        currency = self.get_object()
        serializer = self.get_serializer(currency)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        currency = self.get_object()
        serializer = self.get_serializer(currency, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        currency = self.get_object()
        currency.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def get_permissions(self):
        if self.action == "create" or self.action == "destroy" or self.action == "update" or self.action == "patch":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def list(self, request):
        pagination_class = StockResultsSetPagination()
        
        queryset = pagination_class.paginate_queryset(self.get_queryset(), request)
        data = []
        for stock in queryset:
            serializer = self.get_serializer(stock)
            serialized_data = serializer.data
            data.append(serialized_data)

        return Response(data)

    def retrieve(self, request, pk=None):

        if request.method == "GET":
            self.serializer_class = StockGetSerializer

        stock = self.get_object()
        serializer = self.get_serializer(stock)
        serializerData = serializer.data

        ticker = serializerData["symbol"]
        if serializerData["currency"]["code"] == "TRY":
            ticker += ".IS"

        detail = yf.Ticker(ticker).info

        serializerData['price'] = detail['currentPrice']
        serializerData["detail"] = detail

        return Response(serializerData)

    def create(self, request):
        if request.method == "POST":
            self.serializer_class = StockCreateSerializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        stock = self.get_object()
        serializer = self.get_serializer(stock, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        stock = self.get_object()
        stock.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Response body stock serializer
    # Request body stock pattern search serializer
    @action(
        detail=False, methods=["post"], serializer_class=StockPatternSearchSerializer
    )
    def search(self, request):
        """
        Search for stocks by pattern and limit.
        """
        input_serializer = StockPatternSearchSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        pattern = input_serializer.validated_data.get("pattern").strip().lower()
        limit = input_serializer.validated_data.get("limit", 10)
        if not pattern:
            return Response(
                {"error": "Pattern is required."}, status=status.HTTP_400_BAD_REQUEST
            )
        starts_with = Stock.objects.filter(
            Q(name__istartswith=pattern) | Q(symbol__istartswith=pattern)
        ).order_by("name")
        if starts_with.count() >= limit:
            stocks = starts_with[:limit]
            serializer = StockSerializer(stocks, many=True)
            return Response(serializer.data)
        contains = (
            Stock.objects.filter(
                Q(name__icontains=pattern) | Q(symbol__icontains=pattern)
            )
            .exclude(id__in=starts_with)
            .order_by("name")
        )

        stocks = list(starts_with) + list(contains)
        stocks = stocks[:limit]

        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        request_body=StockHistoricDataSerializer,
        operation_summary="""
            Submit a request for historic stock data. 
            Available time ranges: 
            '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max', 
            Available intervals: 
            '1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1wk', '1mo', '3mo'.
            """,
        operation_description=(
            """
            Submit a request for historic stock data. 
            Available time ranges: 
            '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max', 
            Available intervals: 
            '1m', '2m', '5m', '15m', '30m', '60m', '90m', '1h', '1wk', '1mo', '3mo'.
            """
        ),
    )
    @action(detail=True, methods=["post"], serializer_class=StockHistoricDataSerializer)
    def get_historical_data(self, request, pk=None):
        stock = self.get_object()
        stock_symbol = stock.symbol
        serializer = StockHistoricDataSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        start_date = serializer.validated_data["start_date"]
        end_date = serializer.validated_data["end_date"]
        period = serializer.validated_data["period"]
        interval = serializer.validated_data["interval"]

        if stock.currency.code == "TRY":
            stock_symbol += ".IS"

        if not start_date or not end_date:
            try:
                data = yf.Ticker(stock_symbol).history(period=period, interval=interval)                
                data = data.round(2)
                data["Date"] = data.index

                data = data.reset_index(drop=True)

                return Response(data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(
                    {"error": f"An error occurred while fetching data: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

        try:
            data = yf.Ticker(stock_symbol).history(
                interval=interval, start=start_date, end=end_date
            )
            data = data.round(2)
            data["Date"] = data.index
            data = data.reset_index(drop=True)

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"An error occurred while fetching data: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        tags = self.get_queryset()
        serializer = self.get_serializer(tags, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        tag = self.get_object()
        serializer = self.get_serializer(tag)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        tag = self.get_object()
        serializer = self.get_serializer(tag, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        tag = self.get_object()
        tag.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PortfolioViewSet(viewsets.ModelViewSet):
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        portfolios = self.get_queryset()
        serializer = self.get_serializer(portfolios, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        portfolio = self.get_object()
        serializer = self.get_serializer(portfolio)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        portfolio = self.get_object()
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(
        detail=False, methods=["get"], url_path="portfolios-by-user/(?P<user_id>[^/.]+)"
    )
    def user_portfolios(self, request, user_id=None):
        portfolios = self.queryset.filter(user_id=user_id)
        serializer = self.get_serializer(portfolios, many=True)
        return Response(serializer.data)


class PortfolioStockViewSet(ViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PortfolioStockActionSerializer

    def get_serializer(self, *args, **kwargs):
        context = kwargs.pop("context", {})
        context["request"] = self.request
        context["view"] = self
        return self.serializer_class(*args, context=context, **kwargs)

    @action(detail=False, methods=["post"])
    def add_stock(self, request):
        serializer = self.get_serializer(
            data=request.data, context={"action": "add_stock"}
        )
        serializer.is_valid(raise_exception=True)

        portfolio = serializer.validated_data["portfolio_id"]
        stock = serializer.validated_data["stock"]
        price_bought = serializer.validated_data["price_bought"]
        quantity = serializer.validated_data.get("quantity", 1)

        if PortfolioStock.objects.filter(portfolio=portfolio, stock=stock).exists():
            return Response(
                {"detail": "This stock is already in the portfolio."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        PortfolioStock.objects.create(
            portfolio=portfolio,
            stock=stock,
            price_bought=price_bought,
            quantity=quantity,
        )

        portfolio.stocks.add(stock)

        return Response(
            {"status": "Stock added to portfolio"}, status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=["post"])
    def remove_stock(self, request):
        serializer = self.get_serializer(
            data=request.data, context={"action": "remove_stock"}
        )
        serializer.is_valid(raise_exception=True)

        portfolio = serializer.validated_data["portfolio_id"]
        stock = serializer.validated_data["stock"]

        portfolio_stock = PortfolioStock.objects.filter(
            portfolio=portfolio, stock=stock
        )
        if not portfolio_stock.exists():
            return Response(
                {"detail": "This stock is not in the portfolio."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        portfolio_stock.delete()

        portfolio.stocks.remove(stock)

        return Response(
            {"status": "Stock removed from portfolio"}, status=status.HTTP_200_OK
        )


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def get_permissions(self):
        if self.action == "create":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def list(self, request):
        queryset = self.get_queryset()
        data = []
        for post in queryset:
            serializer = self.get_serializer(post)
            serialized_data = serializer.data
            serialized_data["tags"] = [
                {"id": tag.id, "name": tag.name} for tag in post.tags.all()
            ]
            data.append(serialized_data)

        return Response(data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        data = serializer.data
        data["author"] = instance.author.id
        data["liked_by"] = [user.id for user in instance.liked_by.all()]
        data["disliked_by"] = [user.id for user in instance.disliked_by.all()]
        data["tags"] = [{"id": tag.id, "name": tag.name} for tag in instance.tags.all()]
        data["portfolios"] = [
            {"id": portfolio.id, "name": portfolio.name}
            for portfolio in instance.portfolios.all()
        ]

        return Response(data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = self.get_serializer(post, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="posts-by-user/(?P<user_id>[^/.]+)")
    def user_posts(self, request, user_id=None):
        queryset = self.queryset.filter(author_id=user_id)
        if not queryset.exists():
            return Response(
                {"detail": "No posts found for the specified user."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = []
        for post in queryset:
            serializer = self.get_serializer(post)
            serialized_data = serializer.data
            serialized_data["tags"] = [
                {"id": tag.id, "name": tag.name} for tag in post.tags.all()
            ]
            data.append(serialized_data)

        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="posts-by-tag/(?P<tag_id>[^/.]+)")
    def posts_by_tag(self, request, tag_id=None):
        tag = get_object_or_404(Tag, id=tag_id)
        queryset = Post.objects.filter(tags=tag)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='posts-by-stock/(?P<stock_id>[^/.]+)')
    def posts_by_stock(self, request, stock_id=None):
        stock = get_object_or_404(Stock, id=stock_id)
        queryset = Post.objects.filter(stocks=stock)
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @extend_schema(
        parameters=[
            OpenApiParameter(
                name='tags',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.PATH,
                description='Comma-separated list of tag IDs (e.g., 1,2,3)',
                required=True,
            ),
            OpenApiParameter(
                name='type',
                type=OpenApiTypes.STR,
                location=OpenApiParameter.QUERY,
                description='Type of filter: "and" (all tags) or "or" (at least one tag)',
                required=False,
            )
        ]
    )
    @action(detail=False, methods=['get'], url_path='posts-by-tags/(?P<tags>[^/.]+)')
    def posts_by_tags(self, request, tags=None):
        if not tags:
            return Response({'detail': 'No tags provided.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tag_ids = [int(tag_id.strip()) for tag_id in tags.split(',') if tag_id.strip().isdigit()]
        except ValueError:
            return Response({'detail': 'Invalid tag IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)

        tags = Tag.objects.filter(id__in=tag_ids)
        if not tags.exists():
            return Response({'detail': 'No posts found for the specified tags.'}, status=status.HTTP_404_NOT_FOUND)

        filter_type = request.query_params.get('type', 'or').lower()

        if filter_type == 'and':
            # Posts that have all the specified tags
            for tag in tags:
                posts = Post.objects.filter(tags=tag) if 'posts' not in locals() else posts.filter(tags=tag)
        else:  # Default to "or" behavior
            # Posts that have at least one of the specified tags
            posts = Post.objects.filter(tags__in=tags).distinct()

        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        comments = self.get_queryset()
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        comment = self.get_object()
        serializer = self.get_serializer(comment)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user_id=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        comment = self.get_object()
        serializer = self.get_serializer(comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        comment = self.get_object()
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["get"], url_path="post-comments/(?P<post_id>[^/.]+)")
    def post_comments(self, request, post_id=None):
        """
        Custom action to retrieve comments for a specific post.
        """
        comments = self.queryset.filter(post_id=post_id)
        serializer = self.get_serializer(comments, many=True)
        return Response(serializer.data)


class PostLikeView(generics.GenericAPIView):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Handle liking a post."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_id = serializer.validated_data["post_id"]
        post = get_object_or_404(Post, id=post_id)

        user = request.user
        if user in post.liked_by.all():
            post.liked_by.remove(user)
            return Response({"detail": "Like removed."}, status=status.HTTP_200_OK)

        post.liked_by.add(user)
        post.disliked_by.remove(user)  # Ensure mutual exclusivity
        return Response({"detail": "Post liked."}, status=status.HTTP_200_OK)


class PostDislikeView(generics.GenericAPIView):
    serializer_class = DislikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """Handle disliking a post."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_id = serializer.validated_data["post_id"]
        post = get_object_or_404(Post, id=post_id)

        user = request.user
        if user in post.disliked_by.all():
            post.disliked_by.remove(user)
            return Response({"detail": "Dislike removed."}, status=status.HTTP_200_OK)

        post.disliked_by.add(user)
        post.liked_by.remove(user)  # Ensure mutual exclusivity
        return Response({"detail": "Post disliked."}, status=status.HTTP_200_OK)

class AddStocksToPostView(generics.GenericAPIView):
    serializer_class = PostStockAddSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Stocks added successfully."}, status=status.HTTP_200_OK)

class IndexViewSet(viewsets.ModelViewSet):
    queryset = Index.objects.all()
    serializer_class = IndexSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def list(self, request):
        if request.method == "GET":
            self.serializer_class = IndexListSerializer
        indices = self.get_queryset()
        serializer = self.get_serializer(indices, many=True)
        serializerData = serializer.data
        symbols = [
            (
                index["symbol"] + ".IS"
                if index["currency"]["code"] == "TRY"
                else index["symbol"]
            )
            for index in serializerData
        ]
        if not symbols:
            return Response([], status=status.HTTP_200_OK)
        data = yf.download(tickers=symbols, period="1d", interval="1d")
        prices = {
            symbol.split(".")[0]: float(data["Close"][symbol]) for symbol in symbols
        }

        for index in serializerData:
            index["price"] = prices[index["symbol"]]
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        if request.method == "GET":
            self.serializer_class = IndexListSerializer
        index = self.get_object()
        serializer = self.get_serializer(index)
        serializerData = serializer.data

        indexName = serializerData["symbol"]
        if serializerData["currency"]["code"] == "TRY":
            indexName += ".IS"
        data = yf.download(tickers=indexName, period="1d", interval="1d")
        serializerData["price"] = data["Close"].values[0][0]

        stocks = []

        def get_stats(ticker):
            info = yf.Ticker(ticker).info

            stockInfo = {
                "currency": info["currency"],
                "symbol": info["symbol"],
                "price": info["currentPrice"],
            }
            stocks.append(stockInfo)

        ticker_list = [
            a["symbol"] + ".IS" if a["currency"]["code"] == "TRY" else a["symbol"]
            for a in serializerData["stocks"]
        ]
        with ThreadPoolExecutor() as executor:
            executor.map(get_stats, ticker_list)

        serializerData["stocks"] = stocks
        return Response(serializerData)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        index = self.get_object()
        serializer = self.get_serializer(index, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        index = self.get_object()
        index.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SearchViewSet(ViewSet):

    @action(detail=False, methods=["get"], url_path="posts/(?P<q>[^/.]+)")
    def search_posts(self, request, q=None):
        if not q:
            return Response({"detail": "Search query not provided."}, status=400)

        queryset = Post.objects.filter(Q(title__icontains=q) | Q(content__icontains=q))
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="tags/(?P<q>[^/.]+)")
    def search_tags(self, request, q=None):
        if not q:
            return Response({"detail": "Search query not provided."}, status=400)

        queryset = Tag.objects.filter(name__icontains=q)
        serializer = TagSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="portfolios/(?P<q>[^/.]+)")
    def search_portfolios(self, request, q=None):
        if not q:
            return Response({"detail": "Search query not provided."}, status=400)

        queryset = Portfolio.objects.filter(name__icontains=q)
        serializer = PortfolioSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="all/(?P<q>[^/.]+)")
    def search_all(self, request, q=None):
        if not q:
            return Response({"detail": "Search query not provided."}, status=400)

        results = {}

        post_queryset = Post.objects.filter(
            Q(title__icontains=q) | Q(content__icontains=q)
        )
        post_serializer = PostSerializer(post_queryset, many=True)
        results["posts"] = post_serializer.data

        tag_queryset = Tag.objects.filter(name__icontains=q)
        tag_serializer = TagSerializer(tag_queryset, many=True)
        results["tags"] = tag_serializer.data

        portfolio_queryset = Portfolio.objects.filter(name__icontains=q)
        portfolio_serializer = PortfolioSerializer(portfolio_queryset, many=True)
        results["portfolios"] = portfolio_serializer.data

        return Response(results)


class ProxyAnnotationView(ViewSet):
    serializer_class = MinimalAnnotationSerializer
    def post(self, request, *args, **kwargs):
        serializer = MinimalAnnotationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        user = request.user
        print(f"user id is {user.id}")
        print(f"username is {user.username}")
        user_id=user.id
        username=user.username

        enriched_data = {
            "type": "Annotation",
            "body": {
                "type": "TextualBody",
                "value": validated_data["value"],
                "format": "text/plain",
                "language": "en",
                "purpose": "commenting"
            },
            "target": {
                "type": "TextPositionSelector",
                "source": f"{settings.BACKEND_SERVICE_URL}/posts/{validated_data['post_id']}",
                "start": validated_data["start"],
                "end": validated_data["end"]
            },
            "creator": {
                "type": "Person",
                "name": f"{username}",
                "creator_id": f"{settings.BACKEND_SERVICE_URL}/users/{user_id}"
            }
        }

        try:
            annotations_service_url = f"{settings.ANNOTATIONS_SERVICE_URL}/annotations/"
            print(annotations_service_url)
            response = requests.post(annotations_service_url, json=enriched_data)

            if response.status_code == 201:
                return Response(response.json(), status=status.HTTP_201_CREATED)
            else:
                return Response(response.json(), status=response.status_code)
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], url_path='annotations-by-post/(?P<post_id>[^/.]+)')
    def retrieve_annotations_by_posts(self, request, post_id=None):
        annotations_service_url = f"{settings.ANNOTATIONS_SERVICE_URL}/annotations/source/{post_id}"
        try:
            response = requests.get(annotations_service_url, params={"source": post_id})
            
            if response.status_code != 200:
                return Response(
                    {"error": f"Failed to retrieve annotations: {response.text}"},
                    status=response.status_code
                )
            
            annotations = response.json()
            formatted_annotations = self.format_annotations(annotations)
            return Response(formatted_annotations, status=status.HTTP_200_OK)
        
        except requests.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def format_annotations(self, annotations):
        return [
            {
                "post_id": int(annotation["target"]["source"].split("/")[-1]),
                "start": annotation["target"]["start"],
                "end": annotation["target"]["end"],
                "value": annotation["body"]["value"],
                "user_id": int(annotation["creator"]["creator_id"].split("/")[-1]),
                "created_at": annotation["created"],
                "updated_at": annotation["modified"],
            }
            for annotation in annotations
        ]
