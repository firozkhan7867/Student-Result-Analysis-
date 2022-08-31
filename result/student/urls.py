from django.urls import path

from . import views
urlpatterns = [
    # path('semester',views.SemView.as_view()),
    path('index',views.index, name="index"),
    # path('upload',views.upload,name="upload"),
    path('data',views.data,name="upload_data"),
    # path('backlog',views.backlogupload,name="backlog"),
    path('backpost',views.backlogdata,name="backlog_data"),
    path('subj/<int:sem_id>',views.get_sem_analysis,name="sem_data"),
    path('all-subj/<int:sem_id>',views.subj_analysis_all,name="all-subj-analysis"),
    path('student',views.student_detail,name="student"),
    path('student/<int:sem_id>',views.get_sect_analysis,name="student_data"),
    path('test',views.generate_list_semester, name="test"),
    path('updata',views.get_reg_branch_batch,name="updata"),
    path('backupdata',views.get_back_predata, name="backdata"),
    path('batch/<int:batch_id>/<int:branch_id>',views.get_batch_analysis,name="batch_data"),
    path('batch/sem/<int:batch_id>/<int:branch_id>',views.get_all_sems_backlog,name="Sem_backlog_data"),
    path('fetch_result/<str:roll>/<str:branch>/<int:sem>',views.fetch_result,name="fetch_result"), 
    path('fetch_semester_result/<int:batch>/<int:sem>/<str:branch>',views.fetch_semester_result,name="fetch_semester_result"), 
    path('check_sem_data_exists/<int:batch>/<int:sem>/<str:branch>',views.check_sem_data_exists,name="check_sem_data_exists"), 
    path('fetch_test/<int:num>',views.fetch_test,name="fetch_test"),
    # path('roll/<str:roll>',views.get_roll_details,name="get_roll_details"),
    # path('get_topper_data/<int:batch>/<int:sem>/<str:branch>',views.get_topper_data,name="get_topper_data"),
    path('get_sect_data/<int:sem_id>',views.get_sect_data,name="get_sect_data"),
    path('get_fetch_data',views.get_fetch_data,name="get_fetch_data"),
    path('check_student_exists/<str:roll>',views.check_student_exists,name="check_student_exists"),
    path('get_subj_section_data/<int:sem_id>',views.get_subj_section_data,name="get_subj_section_data"),
    path('get_sec_wise_topper_data/<int:batch>/<int:sem>/<str:branch>/<int:sec>',views.get_sec_wise_topper_data,name="get_sec_wise_topper_data"),
    path('get_individual_sem_analysis/<str:roll>',views.get_individual_sem_analysis,name="get_individual_sem_analysis"),
]



 


