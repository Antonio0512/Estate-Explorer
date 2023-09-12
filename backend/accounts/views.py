from django.contrib.auth import get_user_model, authenticate
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

User = get_user_model()


class SignInApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or email == "" or not password or password == "":
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)

        user_data = {
            'id': user.id,
            'email': user.email,
            'name': user.name
        }

        return Response({'token': token.key, 'user': user_data})


class SignUpApiView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):

        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                if len(password) < 6:
                    return Response({"error": "Password must be at least 6 characters"},
                                    status=status.HTTP_400_BAD_REQUEST)
                else:
                    user = User.objects.create_user(email=email, password=password, name=name)
                    user.save()
                    return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
