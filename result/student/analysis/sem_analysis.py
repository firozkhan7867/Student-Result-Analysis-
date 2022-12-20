from django.db.models.fields import CharField
from django.http.response import HttpResponse
from student.add_to_DB import extract_name
from student.models import *
import pandas as pd
import numpy as np
from .section_subj_analysis import get_pass_fail_count_of_each_subject_for_table,get_pass_fail_count_of_each_subject
from student.preprocesssing import get_section_list
from django.http.response import HttpResponse, JsonResponse
from django.db.models import Count,Value,Case,When,F,DecimalField,Q,IntegerField

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
    

def get_section_fail_perc(sem_id,secs):
    
    sem = Semester.objects.get(id=sem_id)
    batch  = Batch.objects.get(id=sem.batch.id)
    branch_obj = Branch.objects.get(id=sem.branch.id)
    failcount = []
    for sec in secs:
        students = Student.objects.filter(batch=batch,branch=branch_obj,section=sec)
        fCount = Subjects.objects.filter(roll__in=(students),sem=sem,branch=branch_obj,batch=batch).aggregate(total=Count(Case(When(result__icontains="F",then=1),output_field=IntegerField())))
        failcount.append(fCount["total"])
    
    data = []
    # print(failcount,sum(failcount))
    if sum(failcount) < 1:
        return failcount

    for i in failcount:
        data.append(int(i/sum(failcount)*100))
    # print(data)
    
    print("inside section fail", data)
    return data

    
def cgpa_analysis_fun(cgpa):
    cgpa_analysis = {"O":0,"A+":0, "A":0, "B+":0, "B":0,"C":0}
    cgpa_data = {"O":[],"A+":[], "A":[], "B+":[], "B":[],"C":[]}
    for i in range(len(cgpa)):
        data = {"roll":cgpa[i].roll.roll,"name":cgpa[i].roll.name, "grade":cgpa[i].SCGPA,"result":cgpa[i].passed,"backlog":cgpa[i].no_of_backlog}
        if cgpa[i].SCGPA > 9 :
            cgpa_analysis["O"] +=1
            cgpa_data["O"].append(data)
        elif cgpa[i].SCGPA > 8:
            cgpa_analysis["A+"] +=1
            cgpa_data["A+"].append(data)
        elif cgpa[i].SCGPA > 7:
            cgpa_analysis["A"] +=1
            cgpa_data["A"].append(data)
        elif cgpa[i].SCGPA > 6:
            cgpa_analysis["B+"] +=1
            cgpa_data["B+"].append(data)
        elif cgpa[i].SCGPA > 5:
            cgpa_analysis["B"] +=1
            cgpa_data["B"].append(data)
        elif cgpa[i].SCGPA > 4:
            cgpa_analysis["C"] +=1
            cgpa_data["C"].append(data)
    data = {"cgpa":cgpa_analysis,"list":cgpa_data}
    return data

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
            cgpa.append(per)
            
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
            
            




def get_sect_data(sem_id):
    sem = Semester.objects.get(id=sem_id)
    # sem = convert_num_to_sem(sem)
    batch  = Batch.objects.get(id=sem.batch.id)
    branch_obj = Branch.objects.get(id=sem.branch.id)
    students = Student.objects.filter(batch=batch,branch=branch_obj)
    secs = []
    main_k = {}
    for i in students:
        if i.section not in main_k.keys() and  i.section != 10:
            k = {}
            k["name"] = i.section
            secs.append(k)
            main_k[i.section] = 1
    
    
    return {"data":secs}

# Toppers Data API for single semester

def get_topper_data(sem_id):
    sem = Semester.objects.get(id=sem_id)
    # sem = convert_num_to_sem(sem)
    batch  = Batch.objects.get(id=sem.batch.id)
    # branch_obj = Branch.objects.get(id=sem.branch.id)
    # students = Student.objects.filter(batch=batch,branch=branch_obj)
    performance =  Performance.objects.filter(batch=batch,regulation=sem.regulation,sem=sem).order_by('-SCGPA')
    k = 0
    data = []
    for i in performance:
        if k==10:
            break
        data.append({"roll":i.roll.roll,"name":i.roll.name,"sect":i.roll.section,"SCGPA":i.SCGPA})
        k+=1

    return data






# this function will return list of students with active backlog
def getBackStudentDetails(sem):
    sem = Semester.objects.get(id=sem.id)
    reg = Regulation.objects.get(id=sem.regulation.id)
    branch = Branch.objects.get(id=sem.branch.id)
    batch = Batch.objects.get(id=sem.batch.id)

    subjects = Subjects.objects.all().filter(sem=sem,batch=batch,regulation=reg,branch=branch,fail=True).order_by('roll')
    
    k = []

    for sub in subjects:
        # print(sub.id,sub.roll,sub.credit,sub.attendance,sub.grade,sub.cgpa,sub.fail,sub.name,"-----"*30)
        data ={}
        data["id"] = sub.id
        data["roll"] = sub.roll.roll
        data["name"] = sub.roll.name
        data["credit"] = sub.credit
        data["attendance"] = sub.attendance
        data["grade"] = sub.grade
        data["cgpa"] = sub.cgpa
        data["result"] = sub.fail
        data["subjName"] =sub.name
        data["code"] = sub.code
        k.append(data)
    
    return k



#---- Function Depending on Main SEMESTER ANALYSIS FUNCTIONs -------------

def get_sect_analysis(sem_id):
    sem = Semester.objects.get(id=sem_id)
    reg = Regulation.objects.get(id=sem.regulation.id)
    batch = Batch.objects.get(id=sem.batch.id)
    branch = Branch.objects.get(id=sem.branch.id)
    if Student.objects.filter(regulation=reg, batch=batch,branch=branch).exists():
        dsecs = get_sect_data(sem_id)
        secs = []
        for i in dsecs["data"]:
            secs.append(i["name"])
        subjs = sem.subject.split(',')
        data = []
        for i in subjs:
            code,name = i.split('-')[0],i.split('-')[1:]
            l = get_pass_fail_count_of_each_subject_for_table(code,i,secs,sem,branch,batch)
            data.append(l)
        students = Student.objects.all().filter(regulation=reg, batch=batch,branch=branch)
        sect_list = get_section_list(students)
        main = {}   
        main["sect"] = list(sect_list.keys())
        main["data"] = data
        main2 = {}
        main2["data"] = main
        main2["msg"] = "success"
        return main2
    else:
        return {"msg":"error"}






def get_subj_section_data(sem_id):
    top_data = get_topper_data(sem_id)
    dsecs = get_sect_data(sem_id)
    sem = Semester.objects.get(id=sem_id)
    batch  = Batch.objects.get(id=sem.batch.id)
    branch_obj = Branch.objects.get(id=sem.branch.id)
    students = Student.objects.filter(batch=batch,branch=branch_obj)
    secs = []
    for i in dsecs["data"]:
        secs.append(i["name"])
    sectionTopData = get_sec_wise_topper_data(sem_id,secs)
    subjs = sem.subject.split(',')
    fails = get_section_fail_perc(sem_id,secs)
    data = []
    for i in subjs:
        code,name = i.split('-')[0],i.split('-')[1:]

        l = get_pass_fail_count_of_each_subject(code,i,secs,sem,branch_obj,batch)
        data.append(l)

    sectionTopData["onlysections"] = secs
    
    temp = {"subjSectionData":data,"sectionList":dsecs,"semtopData":top_data,"failPercentageSection":fails,"onlysections":secs,"eachSectionTopData":sectionTopData}
    pp = {"data":temp,"msg":"success"}
    return pp










        
        
        
  

#-------------------- Main FUNCTION FOR SEM ANALYSIS ---------------- 
# SEM ANALYSIS FUNCTION       
        
def get_subject_analysis_data(sem,sem_id):
    if Semester.objects.filter(id=sem.id).exists():
        sem = Semester.objects.get(id=sem.id)
        batch = sem.batch
        reg = sem.regulation
        branch = sem.branch
        subjData = get_subj_section_data(sem_id)
        sectData = get_sect_analysis(sem_id)
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
        sem_data["failedStudents"] = getBackStudentDetails(sem)
        sem_data["sem_performance"] = per
        sem_data["details"] = {"name":sem.name,"reg":sem.regulation.regulation,"branch":sem.branch.branches,"batch":sem.batch.name}
        finalData = {}
        finalData["subjData"] = subjData
        finalData["sectData"] = sectData
        finalData["semAnalysis"] = sem_data
    return finalData





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




def get_sec_wise_topper_data(sem_id,secs):
    # print(dsecs)
    sem = Semester.objects.get(id=sem_id)
    # sem = convert_num_to_sem(sem)
    batch  = Batch.objects.get(id=sem.batch.id)
    branch_obj = Branch.objects.get(id=sem.branch.id)
    # firoz = Student.objects.filter(roll="20135A0516").values()
    # print(firoz)

    data = {}

    for sec in secs:
        k = {}
        per_data=[]
        students = Student.objects.filter(batch=batch,branch=branch_obj,section=sec)
        performance =  Performance.objects.filter(roll__in=(students),batch=batch,regulation=sem.regulation,sem=sem).order_by('-SCGPA')[:10]
        for i in performance:
            per_data.append({"roll":i.roll.roll,"name":i.roll.name,"sect":i.roll.section,"SCGPA":i.SCGPA})
        data[f"{sec}"] = per_data
    
    # p = {"allSection":get_topper_data(sem_id)}
    data["allSection"] = get_topper_data(sem_id)


    return data





