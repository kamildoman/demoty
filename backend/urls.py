from django.urls import path, include, re_path
from .views import DemotView, FrontendAppView, CommentView, RegisterAPI, LoginAPI, UserAPI, UserView
from rest_framework import routers



router = routers.DefaultRouter()
router.register('demots', DemotView)
router.register('comments', CommentView)
router.register('all-users', UserView)



urlpatterns = [
    path('api/', include(router.urls)),
    path('', FrontendAppView.as_view()),
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('user/', UserAPI.as_view()),
]

urlpatterns += [
   re_path(r'^demot/.*?$', FrontendAppView.as_view()),
]