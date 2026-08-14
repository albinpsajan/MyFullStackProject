from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# 1. Create a Router
router = DefaultRouter()

# 2. Register ViewSets
router.register(r'courses', views.CourseViewSet)
router.register(r'students', views.StudentViewSet)

urlpatterns = [
    # path('students/', views.student_list),
    path('hello/', views.hello_world, name='hello'),
    path('courses/', views.course_list, name='course_list'),
    path('department/<int:id>/', views.department_detail, name='department_detail'),
    path('courses/add/', views.course_create, name='course_create'),
    path('courses/edit/<int:id>/', views.course_edit, name='course_edit'),
    path('register-student/', views.student_create, name='student_create'),
    path('register/', views.register_user, name='register'),
    path('delete-student/<int:id>/', views.delete_student),
    path('profile/<int:id>/', views.student_profile),
    path('api/', include(router.urls)),
    path('api/courses/semester/<int:semester>/', views.api_course_list_by_semester, name='api_course_list_by_semester'),
    path('api/courses/syllabus/', views.api_course_syllabus_list, name='api_course_syllabus_list'),
    path('api/courses/<int:id>/syllabus/', views.api_course_syllabus_detail, name='api_course_syllabus_detail'),
]
