from django.core.mail import EmailMessage, EmailMultiAlternatives

class Util:
    @staticmethod
    def send_email( data):
        email = EmailMultiAlternatives(subject=data['email_subject'], to=[data['to_email']])

        email.attach_alternative(data['html_message'], "text/html")
        email.send()