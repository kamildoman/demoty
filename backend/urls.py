from django.urls import path, include
from .views import DemotView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('api', DemotView)



urlpatterns = [
    path('', include(router.urls)),
]