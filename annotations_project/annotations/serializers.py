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
    body = BodySerializer()  
    target = SelectorSerializer()
    creator = CreatorSerializer()
    generator = GeneratorSerializer(required=False)

    class Meta:
        model = Annotation
        fields = '__all__'

    def create(self, validated_data):

        body_data = validated_data.pop('body')
        target_data = validated_data.pop('target')
        creator_data = validated_data.pop('creator')
        generator_data = validated_data.pop('generator', None)

        body = Body.objects.create(**body_data)
        target = Selector.objects.create(**target_data)
        creator = Creator.objects.create(**creator_data)

        generator = None
        if generator_data:
            generator = Generator.objects.create(**generator_data)

        annotation = Annotation.objects.create(
            body=body,
            target=target,
            creator=creator,
            generator=generator,
            **validated_data
        )
        return annotation

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        representation['body'] = BodySerializer(instance.body).data
        representation['target'] = SelectorSerializer(instance.target).data
        representation['creator'] = CreatorSerializer(instance.creator).data
        if instance.generator:
            representation['generator'] = GeneratorSerializer(instance.generator).data

        return representation