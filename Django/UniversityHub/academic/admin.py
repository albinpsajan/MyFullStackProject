from django.contrib import admin
from .models import department, course, Student

# Basic Registration
admin.site.register(department)

# Advanced Registration (Customizing the Grid)
# We create a class to define HOW the data looks in the list
@admin.register(course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'department', 'credits', 'semester') # Columns to show
    list_filter = ('department', 'semester') # Sidebar filters
    search_fields = ('name', 'code') # Search bar at top

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'enrollment_date')
    search_fields = ('first_name', 'email')
    