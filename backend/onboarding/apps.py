from django.apps import AppConfig


class OnboardingConfig(AppConfig):
    name = 'onboarding'
    
    def ready(self):
        import onboarding.signals