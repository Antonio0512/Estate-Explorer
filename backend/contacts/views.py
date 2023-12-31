from rest_framework import permissions
from rest_framework.views import APIView
from .models import Contact
from django.core.mail import send_mail
from rest_framework.response import Response


class ContactCreateView(APIView):
    def post(self, request):
        data = self.request.data

        try:
            send_mail(
                data['subject'],
                'Name: ' + data['name'] + '\nEmail: ' + data['email'] + '\n\nMessage:\n' + data['message'],
                'antonioboyanov9test@gmail.com',
                ['antonioboyanov9test@gmail.com'],
                fail_silently=False
            )

            contact = Contact(name=data['name'], email=data['email'], subject=data['subject'], message=data['message'])
            contact.save()
            return Response({'success': 'Message sent successfully'})

        except Exception as e:
            return Response({'error': str(e)})
