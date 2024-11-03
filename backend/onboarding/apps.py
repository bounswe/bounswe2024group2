from django.apps import AppConfig


class OnboardingConfig(AppConfig):
    name = 'onboarding'

class ProfilesConfig(AppConfig):
    name = 'profiles'

    def ready(self):
        # Import signals to ensure they're registered
        import profiles.signals