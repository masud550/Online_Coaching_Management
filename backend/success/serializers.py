from rest_framework import serializers
from .models import SuccessStory, Achievement


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"


class SuccessStorySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, allow_null=True, required=False)
    achievements = AchievementSerializer(many=True, read_only=True)

    class Meta:
        model = SuccessStory
        fields = "__all__"
