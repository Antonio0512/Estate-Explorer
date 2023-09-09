from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.SignUpApiView.as_view(), name="sign-up")
]