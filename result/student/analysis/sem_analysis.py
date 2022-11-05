from django.db.models.fields import CharField
from django.http.response import HttpResponse
from student.add_to_DB import extract_name
from student.models import *
import pandas as pd
import numpy as np


def title_and_code(subj_list):
    titles = []
    code = []
    for sub in subj_list:
        d = extract_name(sub)
        titles.append(d[1])
        code.append(d[0])
    return [code, titles]


def subj_analysis_one_more(sem,batch,reg,branch,code,name):
    # print("inside    subj_analysis_one_more ")
    subs = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch,code=code,name=name)
    fail_count = 0
    num_of_student = 0
    pass_count = 0
    for sub in subs:
        if sub.fail == True:
            fail_count += 1
        else:
            pass_count +=1
            
        num_of_student +=1
    return {"fail":fail_count,"total_student":num_of_student,"passed_student":pass_count}
    
    
def cgpa_analysis_fun(cgpa):
    cgpa_analysis = {"O":0,"A+":0, "A":0, "B+":0, "B":0,"C":0}
    for i in range(len(cgpa)):
        if cgpa[i] > 9 :
            cgpa_analysis["O"] +=1
        elif cgpa[i] > 8:
            cgpa_analysis["A+"] +=1
        elif cgpa[i] > 7:
            cgpa_analysis["A"] +=1
        elif cgpa[i] > 6:
            cgpa_analysis["B+"] +=1
        elif cgpa[i] > 5:
            cgpa_analysis["B"] +=1
        elif cgpa[i] > 4:
            cgpa_analysis["C"] +=1
    return cgpa_analysis
    
def get_sem_performance_analysis(sem):
    if Performance.objects.filter(sem=sem, regulation=sem.regulation,batch=sem.batch).exists():
        pers = Performance.objects.all().filter(sem=sem, regulation=sem.regulation,batch=sem.batch)
        fail_count = 0
        pass_count = 0
        register_count = 0
        cgpa = []
        no_of_back = []
        
        for per in pers:
            if per.passed == False:
                fail_count +=1
                if per.no_of_backlog > 0:
                    no_of_back.append(per.no_of_backlog)
            else:
                pass_count +=1
            register_count +=1
            cgpa.append(per.SCGPA)
            
        back_data = {}
                
        for i in range(len(no_of_back)):
            if no_of_back[i] in back_data:
                back_data[no_of_back[i]] += 1
            else:
                back_data[no_of_back[i]] = 1
        data = {}
        data["CGPA"] = cgpa_analysis_fun(cgpa)
        data["Fail_count"] = fail_count
        data["Pass_count"] = pass_count
        data["Total_Registered"] = register_count
        data["Back_data"] = back_data
    
        return data

    return 0
            
            
        
        
        
  
# SEM ANALYSIS FUNCTION       
        
def get_subject_analysis_data(sem):
    # print("Inside get_subject_analysis_data () -----")
    if Semester.objects.filter(id=sem.id).exists():
        sem = Semester.objects.get(id=sem.id)
        batch = sem.batch
        reg = sem.regulation
        branch = sem.branch
        
        subjs = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch)
        subj_list = sem.subject.split(',')
        title_code = title_and_code(subj_list)
        code = title_code[0]
        title = title_code[1]
        data = {}
        sem_data = {}
        for i in range(len(code)):
            d = subj_analysis_one_more(sem,batch,reg,branch,code[i],title[i])
            data[code[i]] = {title[i]:d}
        sem_data["Subjects"] = data
        per = get_sem_performance_analysis(sem)
        sem_data["sem_performance"] = per
        sem_data["details"] = {"name":sem.name,"reg":sem.regulation.regulation,"branch":sem.branch.branches,"batch":sem.batch.name}
    return sem_data





def subj_analysis(sem_id,name,code):
    subjs = Subjects.objects.all().filter(sem=sem_id,name=name,code=code)
    return subjs






def all_subj(sem_id):
    sem = Semester.object.get(id=sem_id)
    subs = Subjects.objects.all().filter(sem=sem)
    subj_list = sem.subject.split(',')
    for i in subj_list:
        code,name = i.split('-')
        data = subj_analysis(sem.id,name.strip(),code.strip())
    return {'ji':"hi"}
        


# def section_analysis(sect,reg,batch,branch,sem,students):
#     pass