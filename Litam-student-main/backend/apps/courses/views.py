from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Course, Attendance, Mark
from apps.students.models import StudentProfile
import PyPDF2
import re

class UploadMarksPDFView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,) # Ensure the user is authenticated (Admins or Faculty)
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')
        course_id = request.data.get('course_id')

        if not file_obj or not course_id:
            return Response({'error': 'Please provide a PDF file and course_id'}, status=400)

        try:
            course = Course.objects.get(id=course_id)
            pdf_reader = PyPDF2.PdfReader(file_obj)
            extracted_text = ""
            for page in pdf_reader.pages:
                extracted_text += page.extract_text() + "\n"

            # Parsing logic: We grab all active student roll numbers and regex scan the text for matches
            students = StudentProfile.objects.all()
            results_added = 0
            
            for student in students:
                roll = student.roll_number
                # Matches patterns like "RollNo: 101 - Marks: 85" where the roll number comes first followed by non-digits
                pattern = rf"{roll}\D+(\d{{1,3}})"
                match = re.search(pattern, extracted_text)
                if match:
                    marks_val = int(match.group(1))
                    Mark.objects.update_or_create(
                        student=student, 
                        course=course, 
                        exam_name="PDF Uploaded Results",
                        defaults={'marks_obtained': marks_val, 'total_marks': 100}
                    )
                    results_added += 1

            return Response({'message': f'Successfully parsed PDF. Added/Updated {results_added} records.'})
        except Exception as e:
            return Response({'error': str(e)}, status=500)
