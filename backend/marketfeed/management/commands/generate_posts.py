import random
from faker import Faker
from django.core.management.base import BaseCommand
from marketfeed.models import Post
from onboarding.models import User

class Command(BaseCommand):
    help = 'Generate fake data for the Post model if there are fewer than 100 posts in the database'

    def handle(self, *args, **kwargs):
        fake = Faker()
        existing_posts = Post.objects.count()

        if existing_posts>=100:
            self.stdout.write(self.style.SUCCESS('There are already 100 or more posts in the database. No new posts created.'))
            return

        economy_topics = [
            f"Why is everyone talking about {fake.bs()}?"[:100],
            f"Is {fake.bs()} really the future?"[:100],
            f"{fake.company()} just did something amazing with {fake.bs()}!"[:100],
            f"I can’t believe how {fake.bs()} is changing the game"[:100],
            f"Anyone else seeing the hype around {fake.bs()}?"[:100],
            f"{fake.bs()} and what it means for us all"[:100],
            f"The cool ways {fake.company()} uses {fake.bs()}"[:100],
            f"{fake.currency_name()} in {fake.bs()}—what’s happening?"[:100],
            f"Big moves in {fake.bs()}—check this out!"[:100],
            f"How {fake.bs()} is reshaping the world"[:100],
            f"What’s your take on {fake.bs()} trends?"[:100],
            f"Let’s talk about {fake.bs()} innovations"[:100],
            f"I just read about {fake.bs()} and it’s wild"[:100],
            f"{fake.bs()} in the news—here’s what I think"[:100],
            f"Do you think {fake.bs()} is overhyped?"[:100],
            f"{fake.bs()} updates—what’s happening now?"[:100],
            f"How {fake.company()} is mastering {fake.bs()}"[:100],
            f"{fake.bs()} is trending, but why?"[:100],
            f"Let’s chat about {fake.bs()} strategies"[:100],
            f"What’s so exciting about {fake.bs()}?"[:100]
        ]

        economy_contents = [
            f"I’ve been thinking a lot about {fake.bs()} lately. It feels like everywhere I look, someone is talking about how it’s changing the world! What are your thoughts?",
            f"{fake.bs()} might sound boring to some, but it’s a topic I can’t stop researching. The way {fake.company()} is involved is fascinating!",
            f"Anyone else worried about how {fake.currency_name()} is affecting {fake.bs()}? I think it’s time we started discussing this more seriously.",
            f"I just read an article on {fake.bs()}, and it’s blowing my mind. How are companies like {fake.company()} staying ahead of this trend?",
            f"Sometimes I wonder if {fake.bs()} is just a fad or if it’s truly the future of {fake.currency_name()} economics. What do you think?",
            f"Every time I think I understand {fake.bs()}, something new comes up. It’s like this endless puzzle, especially when you consider what {fake.company()} is doing!",
            f"Feeling inspired by a podcast I listened to about {fake.bs()} today. They mentioned {fake.company()} and how they’re leveraging it—so cool!",
            f"If you’re not paying attention to {fake.bs()}, you’re missing out. I’ve been diving into how it’s reshaping industries, and it’s incredible.",
            f"Spent my afternoon reading about {fake.bs()} and drinking coffee. It’s crazy how fast things are changing in this space!",
            f"Is it just me, or does it seem like {fake.bs()} is becoming a bigger deal every day? Let’s talk about how this impacts our daily lives.",
            f"Have you seen the latest about {fake.company()}? Their work in {fake.bs()} is super innovative! Makes me want to learn more.",
            f"I’ve been dabbling in some research about {fake.bs()}, and I think I’m onto something exciting. Let’s connect if you’re interested!",
            f"People keep saying {fake.bs()} is the key to the future. I wonder if we’re all ready for what’s coming next.",
            f"Big shoutout to {fake.company()} for leading the way in {fake.bs()}. It’s companies like this that make me hopeful for what’s ahead.",
            f"The intersection of {fake.bs()} and everyday life is more significant than we think. It’s something I’ve been reflecting on lately.",
            f"Had an enlightening conversation with a friend about {fake.bs()} and how it’s changing the game for companies like {fake.company()}.",
            f"Woke up with {fake.bs()} on my mind (yes, I’m that person now). The future is looking so dynamic and exciting!",
            f"There’s something about {fake.bs()} that feels so revolutionary. Anyone else digging into how it affects {fake.currency_name()}?",
            f"What role do you think {fake.company()} plays in the whole {fake.bs()} evolution? Let’s debate in the comments!"
        ]

        users = list(User.objects.all())
        if not users:
            fake_user = User.objects.create_user(username=fake.user_name(), email=fake.email(), password="Password123*")
            users = [fake_user]
            self.stdout.write(self.style.WARNING('No users found in the database. A new user has been created.'))

        for _ in range(100):
            title = random.choice(economy_topics)
            content = random.choice(economy_contents)
            author = random.choice(users)

            post = Post(
                title=title,
                content=content,
                author=author,
                created_at=fake.date_time_this_year(),
                updated_at=fake.date_time_this_year(),
            )
            post.save()

        self.stdout.write(self.style.SUCCESS(f'Successfully created 100 fake posts.'))

