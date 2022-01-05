from django.urls import path, include, re_path
from .views import DemotView, FrontendAppView, CommentView
from rest_framework import routers

router = routers.DefaultRouter()
router.register('demots', DemotView)
router.register('comments', CommentView)



urlpatterns = [
    path('api/', include(router.urls)),
    path('', FrontendAppView.as_view()),
]

urlpatterns += [
   re_path(r'^demot/.*?$', FrontendAppView.as_view()),
]