from django.db import models
from django.contrib.auth.models import User
class department(models.Model):
    name=models.CharField(max_length=100,unique=True)
    head_of_dept=models.CharField(max_length=100)
    description=models.TextField(blank=True)

    def __str__(self):
        return self.name
    
    
class course(models.Model):
    SEMESTER_CHOICES=[
        (1,'Semester1'),
        (2,'Semester2'),
        (3,'Semester3'),
        (4,'Semester4'),
    ]
    # foreign key links course to department
    # on_delete=models.CASCADE: if dept is deleted, delete all its courses(data consistency)

    department=models.ForeignKey(
        department,
        on_delete=models.CASCADE,
        related_name='courses'
    )
    name=models.CharField(max_length=100)
    code=models.CharField(max_length=10,unique=True)
    semester=models.IntegerField(choices=SEMESTER_CHOICES,default=1)
    credits=models.IntegerField()
    syllabus=models.FileField(upload_to='courses/syllabus/',null=True,blank=True)


    def __str__(self):
        return f"{self.code} - {self.name}"
class Student(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email=models.EmailField(unique=True)
    enrollment_date=models.DateField(auto_now_add=True)#set once on creation
    #many to many:a student can pick multiple courses
    courses=models.ManyToManyField(course,blank=True)

# upload to create a subfolder inside MEDIA_ROOT for student profile pictures
    profile_picture = models.ImageField(
        upload_to='students/profiles/',
        null=True,
        blank=True
    )
    def  __str__(self):
        return f"{self.first_name} {self.last_name}"

# Compatibility aliases for the REST framework serializers/views
Department = department
Course = course
# Create your models here.

