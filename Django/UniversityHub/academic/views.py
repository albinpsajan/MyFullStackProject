from django.http import HttpResponse


#def student_list(request):
#    return HttpResponse("List of Students")

def hello_world(request):
    # This returns raw text, not HTML
    return HttpResponse("Welcome to University Hub!")


from django.shortcuts import render, redirect
from .forms import StudentForm, CourseForm
from django.contrib.auth.models import User

def student_register(request):

    if request.method == 'POST':
        form = StudentForm(request.POST)

        if form.is_valid():

            # get login fields safely
            username = request.POST.get('username', '').strip()
            password = request.POST.get('password', '').strip()
            email = request.POST.get('email', '').strip()

            # validate login fields first
            if not username or not password or not email:
                return render(request,'academic/student_form.html',{
                    'form': form,
                    'error': 'എന്തോന്നടേയ്, ബുദ്ധിയില്ലേ?,എല്ലാം fill ചെയ്യടേയ്'
                })

            # prevent duplicate username crash
            if User.objects.filter(username=username).exists():
                return render(request,'academic/student_form.html',{
                    'form': form,
                    'error': 'ഈ Username ഇതിനകം ഉപയോഗത്തിലാണ്. മറ്റൊന്ന് പരീക്ഷിക്കൂ.'
                })

            # create user first
            user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )

            # THEN create student object
            student = form.save(commit=False)
            student.user = user
            student.save()

            form.save_m2m()

            return redirect('course_list')

    else:
        form = StudentForm()

    return render(request, 'academic/student_form.html', {'form': form})           # create user first

from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponseForbidden
from django.shortcuts import render, redirect, get_object_or_404
from .models import Student, course, department
from .serializers import CourseSerializer, StudentSerializer
# 1. The @login_required Decorator
# If a guest tries to access this, they are redirected to the Login page automatically.
@login_required
def course_list(request):
    courses = course.objects.all()
    return render(request, "academic/course_list.html", {"courses": courses})

@login_required
def course_create(request):
    if request.method == 'POST':
        form = CourseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('course_list')
    else:
        form = CourseForm()

    return render(request, 'academic/course_form.html', {'form': form, 'title': 'Add Course'})

@login_required
def course_edit(request, id):
    course_item = get_object_or_404(course, id=id)
    if request.method == 'POST':
        form = CourseForm(request.POST, instance=course_item)
        if form.is_valid():
            form.save()
            return redirect('course_list')
    else:
        form = CourseForm(instance=course_item)

    return render(request, 'academic/course_form.html', {'form': form, 'title': 'Edit Course'})

# 2. Custom Permission Checks
# Define a check function: Returns True if user is a Staff member
def is_admin(user):
    return user.is_staff

@user_passes_test(is_admin)
def delete_student(request, id):
    # Only Staff can reach this code
    student = Student.objects.get(id=id)
    if student.user:
        student.user.delete()
    else:
        student.delete()
    return redirect('course_list')
@login_required
def student_profile(request, id):

    # 1. Fetch the requested profile
    profile = Student.objects.get(id=id)

    # 2. Check if the logged-in user matches the profile owner
    # (Assuming we linked the Student model to the User model)
    if request.user != profile.user:
        return HttpResponseForbidden("അമ്പടാ പുളൂസൂ!,You are not authorized to view this profile.")
    
    else:
         return HttpResponse("Profile allowed")
    #JSON

def student_create(request):
    return student_register(request)


def register_user(request):
    return student_register(request)


def department_detail(request, id):
    # Lookup department and return a simple response (no template required)
    dept = get_object_or_404(department, id=id)
    return HttpResponse(f"Department: {dept.name} - {dept.description}")
from django.http import JsonResponse
def api_course_list(request):
    # 1. Get data
    courses = course.objects.all()

    # 2. Convert Python Objects to Dictionary (Serialization)
    # We cannot send Python objects directly over the internet.
    data = {
        'count': courses.count(),
        'results': list(courses.values('name', 'code', 'credits'))
    }

    # 3. Return JSON Response (Not HTML)
    return JsonResponse(data)


def api_root(request):
    return JsonResponse({
        'message': 'UniversityHub API',
        'courses': request.build_absolute_uri('courses/'),
        'students': request.build_absolute_uri('students/'),
        'syllabus': request.build_absolute_uri('courses/syllabus/'),
        'semester': request.build_absolute_uri('courses/semester/1/'),
    })


def api_course_list_by_semester(request, semester):
    courses_by_semester = course.objects.filter(semester=semester)
    serializer = CourseSerializer(courses_by_semester, many=True)
    return JsonResponse(serializer.data, safe=False)


def api_course_syllabus_list(request):
    courses = course.objects.filter(syllabus__isnull=False).exclude(syllabus='')
    serializer = CourseSerializer(courses, many=True)
    return JsonResponse(serializer.data, safe=False)


def api_course_syllabus_detail(request, id):
    course_item = get_object_or_404(course, id=id)
    serializer = CourseSerializer(course_item)
    return JsonResponse(serializer.data, safe=False)

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Course, Student
from .serializers import CourseSerializer, StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # Handles GET (list/detail), POST, PUT, DELETE


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    # Handles GET (list/detail), POST, PUT, DELETE
