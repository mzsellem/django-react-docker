from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    # routes to the views
    # path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path('patients/', views.patients, name="patients"),
    path('api/patients/', views.PatientViewSet.as_view({'get': 'list'}), name="patientview"),
]