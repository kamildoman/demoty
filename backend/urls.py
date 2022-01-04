from django.urls import path, include, re_path
from .views import DemotView, FrontendAppView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('', DemotView)



urlpatterns = [
    path('api/', include(router.urls)),
    path('', FrontendAppView.as_view()),
]

urlpatterns += [
   re_path(r'^(?:.*)/?$', FrontendAppView.as_view()),
]