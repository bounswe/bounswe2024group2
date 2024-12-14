from rest_framework import serializers
from .models import Annotation, Body, Selector, Creator, Generator


class BodySerializer(serializers.ModelSerializer):
    class Meta:
        model = Body
        fields = '__all__'


class SelectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selector
        fields = '__all__'


class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = '__all__'


class GeneratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generator
        fields = '__all__'


class AnnotationSerializer(serializers.ModelSerializer):
    body = BodySerializer()  # Nested serializer for the Body model
    target = SelectorSerializer()  # Nested serializer for the Selector model
    creator = CreatorSerializer()  # Nested serializer for the Creator model
    generator = GeneratorSerializer(required=False)  # Optional nested serializer

    class Meta:
        model = Annotation
        fields = '__all__'

    def create(self, validated_data):
        # Extract nested data
        body_data = validated_data.pop('body')
        target_data = validated_data.pop('target')
        creator_data = validated_data.pop('creator')
        generator_data = validated_data.pop('generator', None)

        # Create or get related instances
        body = Body.objects.create(**body_data)
        target = Selector.objects.create(**target_data)
        creator = Creator.objects.create(**creator_data)

        # Handle optional generator
        generator = None
        if generator_data:
            generator = Generator.objects.create(**generator_data)

        # Create the Annotation instance
        annotation = Annotation.objects.create(
            body=body,
            target=target,
            creator=creator,
            generator=generator,
            **validated_data
        )
        return annotation

    def to_representation(self, instance):
        """Override to_representation to include nested objects in the output."""
        representation = super().to_representation(instance)

        # Include nested objects in the output
        representation['body'] = BodySerializer(instance.body).data
        representation['target'] = SelectorSerializer(instance.target).data
        representation['creator'] = CreatorSerializer(instance.creator).data
        if instance.generator:
            representation['generator'] = GeneratorSerializer(instance.generator).data

        return representation