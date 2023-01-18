from django.contrib import admin
from .models import Attempt, BacklogData, BacklogSubject, Batch, Branch, Performance, Regulation, Semester, Student, StudentDetails, Subjects
# Register your models here.

class VideoAdminModel(admin.ModelAdmin):
    search_fields=('roll','section','regulation','branch')
    list_display = ('roll','name','branch','regulation','batch','section')
    list_filter = ('section','branch','regulation')
    list_display_links = ('roll','section')


class StudentDetailsAdmin(admin.ModelAdmin):
    search_fields = ['roll','name']
    list_display = ('name','roll','dob','aadhar')
    list_display_links = ('name','roll')


class SemesterAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name','branch','batch','regulation')
    list_filter = ('name','branch','batch','regulation')
    list_display_links = ('name',)

class SubjectAdmin(admin.ModelAdmin):
    search_fields=('name','code','sem')
    list_display = ('roll','name','code','branch','batch','sem','result')
    list_filter = ('sem','branch','result','fail')
    list_display_links = ('name','code','roll')




admin.site.register([Branch,Regulation,Subjects,Performance, BacklogSubject ,Attempt, Batch,BacklogData])
admin.site.register(Student,VideoAdminModel)
admin.site.register(StudentDetails,StudentDetailsAdmin)
admin.site.register(Semester,SemesterAdmin)
# admin.site.register(Subjects)


