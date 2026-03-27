from django.urls import path
from .views import UploadMarksPDFView

urlpatterns = [
    path('upload-results/', UploadMarksPDFView.as_view(), name='upload_pdf_results'),
]
