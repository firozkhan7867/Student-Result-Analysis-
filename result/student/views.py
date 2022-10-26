from cgi import test
from distutils.command.install_egg_info import safe_name
from json import JSONDecodeError
from pprint import pformat
from traceback import print_tb
from urllib import response
from django.http import request
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render
from datetime import datetime
from student.filter.filterPreprocessing import tableDetails
from student.filter.filterPreprocessing import filteredStudents
from student.Fetch.main_code import fetchDetails
from rest_framework import status
from rest_framework.response import Response

from .Fetch.preprocessing import fetch_check_result, get_section_fail_perc, get_topper_data

from .analysis.section_subj_analysis import get_pass_fail_count_of_each_subject, get_pass_fail_count_of_each_subject_for_table
from .preprocesssing import convert_num_to_sem, lst_of_sect_of_sem
from student.Fetch.preprocessing import fetch_and_add_student_sem
from student.Fetch.preprocessing import add_preformance_table
from student.Fetch.preprocessing import add_subject,check_sem_exist,get_subject_from_fetch_obj
from student.multi_sem_analysis.Sem_backlog_data_analysis import get_sem_wise_backlog_analysis
from student.multi_sem_analysis.Student_CGPA_analysis import all_sems_analysis
from student.preprocesssing import get_all_batch_for_reg,get_all_reg_for_branch
from student.preprocesssing import  get_section_list
from student.add_to_DB import split_data
from .add_to_DB import check_repeated_subj, split_data_student
from student.back_log_handler import split_data_backlog
from .analysis.sem_analysis import get_subject_analysis_data,all_subj
from .analysis.sect_analysis import  section_analysis
from student.preprocesssing import get_subj_list, get_subject_analysis, get_transformed_data
from .models import BacklogData, Batch, Branch, Performance, Regulation, Semester, Student, StudentDetails, Subjects
import os
import time
import pandas as pd
from rest_framework import status,viewsets
from rest_framework.decorators import api_view
from .serializers import SemesterSerializer,CsrfExemptSessionAuthentication
from rest_framework.parsers import MultiPartParser ,FormParser
from pyexcel_xlsx import get_data
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from student.Fetch.main_code import get_formated_result
from asgiref.sync import sync_to_async
import asyncio
# Create your views here.







######################## --------------- REST API ------------------



# class SemesterViewSet(viewsets.ModelViewSet):
#     queryset = Semester.objects.all()
#     serializer_class = SemesterSerializer
    
#     def post(self, request, *args, **kwargs):
#         name = request.data["name"]
#         reg = request.data["reg"]
#         branch = request.data["branch"]
#         batch = request.data["batch"]
#         file = request.FILES.get('file')
#         data = get_data(file)
#         print(data)
#         sem = Semester.objects.create(name=name,regulation=reg,branch=branch, file=file, batch=batch)
#         split_data(data,sem.id)
#         return HttpResponse({"message": "Book Created"}, status=status.HTTP_200_OK)





class SemView(APIView):
    permission_classes = (AllowAny)
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        name = request.data["name"]
        reg = request.data["reg"]
        branch = request.data["branch"]
        batch = request.data["batch"]
        reg = Regulation.objects.get(id=reg)
        branch= Branch.objects.get(id=branch)
        batch = Batch.objects.get(id=batch)
        sem = Semester.objects.create(name=name,regulation=reg,branch=branch, batch=batch)
        data = request.FILES.get('file')
        sem.file = data
        sem.save()
        split_data(data, sem.id)
        
        return Response({"hi":"hlo"}, status=status.HTTP_200_OK)
        # if file_serializer.is_valid():
        #     file_serializer.save()
        #     return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)








def index(request):
    # print("hi")
    # if request.method == 'POST':
    #     if "excel" in request.FILES:
    #         user = request.FILES["excel"]
    #         ex = Semester(file=user)
    #         ex.save()
    #         data = pd.read_excel(user)
    #         title = get_subj_list(data,6)
    #         di = get_transformed_data(data)
    #         d1 = di[0][title[-1]]
    #         print(d1[d1["Roll"] == "20135A0514"])
    #         print(title[-1])
    sem = Semester.objects.all()
    # # subj = Subjects.objects.filter(name="DISCRETE MATHEMATICAL STRUCTURES")
    # get_subject_analysis(sem,"DISCRETE MATHEMATICAL STRUCTURES")
    
    context  = {
        'sem':sem,
    }
    return render(request,"base.html",context) 

def upload(request):
    sem = Semester.objects.all()
    reg = Regulation.objects.all()
    branch = Branch.objects.all()
    batch = Batch.objects.all()
    context = {
        'sem':sem,
        'branch':branch,
        "reg":reg,
        'batch':batch,
    }
    
    return render(request,"upload_excel.html",context)



def backlogupload(request):
    sem = Semester.objects.all()
    reg = Regulation.objects.all()
    branch = Branch.objects.all()
    batch = Batch.objects.all()
    context = {
        'sem':sem,
        'branch':branch,
        "reg":reg,
        'batch':batch
    }
    
    return render(request,"back_log.html",context)


@csrf_exempt
def backlogdata(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        batch = request.POST.get("batch")
        sem = request.POST.get("sem")
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        sem = Semester.objects.get(id=sem)
        backdata = BacklogData(sem=sem,regulation=reg,branch=bra,batch=batch)
        backdata.save()
        if "file" in request.FILES:
            data = request.FILES['file']
            backdata.file = data
            backdata.save()
        backdata.save()
        split_data_backlog(data,sem.id)
        print("BACKLOG DATA UPLOADED SUCCESSFUL")
        return JsonResponse({"Uploaded":"Success"}, status=status.HTTP_201_CREATED) 
    return JsonResponse({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST) 

# 4 
# sem data upload handler
#  Sem Analysis API Function
#  REACT Fetch API function
#  Section wise Analysis API FUNCTION


# UPLOAD EXCEL FILE API HANDLER
@csrf_exempt
def data(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        name = request.POST.get("name")
        batch = request.POST.get('batch')
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        if Semester.objects.filter(branch=bra,batch=batch,regulation=reg,name=name).exists():
            pass
        else:
            
            # sem = Semester(name=name,branch=bra,regulation=reg,batch=batch)
            # sem.save()
            if "file" in request.FILES:
                data = request.FILES['file']
                sem = Semester(name=name,branch=bra,regulation=reg,batch=batch)
                sem.save()
                sem.file = data
                sem.save()
                if split_data(data,sem.id):
                    print("SEM DATA UPLOADED SUCCESSFUL")
                    return JsonResponse({"Uploaded":"Success"}, status=status.HTTP_201_CREATED) 
                else:
                    sem.delete()
                    return JsonResponse({"Uploaded":"Failed, Please Check that you are not uploading the Same Semester multiple times"},status=status.HTTP_400_BAD_REQUEST)
            else:
                return JsonResponse({"Uploaded":"Failed, Please Upload the Excel File"},status=status.HTTP_400_BAD_REQUEST)
            
            
            
            return JsonResponse({"Uploaded":"Success"}, status=status.HTTP_201_CREATED) 
        return JsonResponse({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST) 
    
    return Response({"Uploaded":"Failed"}, status=status.HTTP_400_BAD_REQUEST)  





def get_sem_analysis(request,sem_id):
    if Semester.objects.filter(id=sem_id).exists():
        sem = Semester.objects.get(id=sem_id)
        return JsonResponse(get_subject_analysis_data(sem))
    
    
    
    
# def get_sect_analysis(request, sem_id):
#     if Semester.objects.filter(id=sem_id).exists():
#         sem = Semester.objects.get(id=sem_id)
#         reg = Regulation.objects.get(id=sem.regulation.id)
#         batch = Batch.objects.get(id=sem.batch.id)
#         branch = Branch.objects.get(id=sem.branch.id)
#         if Student.objects.filter(regulation=reg, batch=batch,branch=branch).exists():
#             students = Student.objects.all().filter(regulation=reg, batch=batch,branch=branch)
#             sect_list = get_section_list(students)
#             subj = sem.subject.split(',')
#             data = {}
#             for i in list(sect_list.keys()):  
#                 analyse = section_analysis(i,reg,batch,branch,sem,students)
#                 data[f"Section_{i}"] = analyse
#             data["subj"] = subj
#             main = {}   
#             main["data"] = data
#             return JsonResponse(main)
    
#     return HttpResponse("hi")
        
        
# SECTION WISE SEM ANALYSIS API HANDLER

def get_sect_analysis(request, sem_id):
    if Semester.objects.filter(id=sem_id).exists():
        sem = Semester.objects.get(id=sem_id)
        reg = Regulation.objects.get(id=sem.regulation.id)
        batch = Batch.objects.get(id=sem.batch.id)
        branch = Branch.objects.get(id=sem.branch.id)
        if Student.objects.filter(regulation=reg, batch=batch,branch=branch).exists():


            #### ------- Warning ---------- Testing area -----------------###

            dsecs = get_sect_data(sem_id)
            print(dsecs)
            secs = []
            for i in dsecs["data"]:
                secs.append(i["name"])

            subjs = sem.subject.split(',')
            # print(subjs)
            data = []
            for i in subjs:
                code,name = i.split('-')[0],i.split('-')[1:]

                l = get_pass_fail_count_of_each_subject_for_table(code,i,secs,sem,branch,batch)
                # msg = f"result Analysis for subject : {name} and analysis = {l}"
                data.append(l)
                # subj_data = Subjects.objects.filter(sem=sem,batch=batch,branch=branch_obj,roll=)
            

            ##### --------------  wait for while --------------------  ####
            students = Student.objects.all().filter(regulation=reg, batch=batch,branch=branch)
            sect_list = get_section_list(students)
            # subj = sem.subject.split(',')
            # data = []
            # for i in subj:  
            #     analyse = section_analysis(i,reg,batch,branch,sem,students,sect_list)
            #     data.append(analyse)
            main = {}   
            # print(data)
            main["sect"] = list(sect_list.keys())
            main["data"] = data
            main2 = {}
            main2["data"] = main
            # print(main2)
            return JsonResponse(main2,safe=False)
    
    return HttpResponse("hi")
        
        


@csrf_exempt
def student_detail(request):
    if request.method == "POST":
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        batch = request.POST.get("batch")
        bra = Branch.objects.get(id=branch)
        reg = Regulation.objects.get(id=reg)
        batch = Batch.objects.get(id=batch)
        # students = Student.objects.all().filter(regulation=reg,branch=bra, batch=batch)
        # backdata = BacklogData.objects.get(id=backdata.id)
        
        if "file" in request.FILES:
            data = request.FILES['file']
            split_data_student(data, bra,reg,batch)
            
            
        
        # split_data_backlog(data,sem.id).\
    
    
    reg = Regulation.objects.all()
    batch = Batch.objects.all()
    branch = Branch.objects.all()
    
    context = {
        'regs': reg,
        'batch': batch,
        'branch': branch,
    }
    
    return render(request, "student.html",context)


def generate_list_semester(request):
    branchs = Branch.objects.all()
    
    data = []
    for i  in branchs:
        temp = {}
        temp["id"] = i.id
        temp["name"] = i.branches
        temp["reg"] = get_all_reg_for_branch(i)
        data.append(temp)
    # print(data)
     
    return JsonResponse(data,safe=False)


def subj_analysis_all(request,sem_id):
    sem = Semester.objects.get(id=sem_id)
    
    data = all_subj(sem.id)
        
    return HttpResponse(sem.subject)



# def generate_list_semester(request):
#     reg = Regulation.objects.all()
#     # batchs = Batch.objects.all()
#     # print(batchs)
#     data = []
#     for i in reg:
#         sub = {}
#         sub["id"] = i.id
#         sub["title"] = i.regulation
#         sub["year"] = i.year
#         sub["data"] = get_all_batch_for_reg(i)
#         data.append(sub)    
        
#     return JsonResponse(data,safe=False)
    
    
def get_reg_branch_batch(request):
    regs = Regulation.objects.all()
    batchs = Batch.objects.all()
    branchs = Branch.objects.all()
    
    reg_dic = []
    for i in regs:
        temp = {}
        temp["title"] = i.regulation
        temp["id"] = i.id
        temp["name"] = f"{i}"
        reg_dic.append(temp)
    batch_dic = []
    for i in batchs:
        temp = {}
        temp["name"] = i.name
        temp["reg"] = i.reg.regulation
        temp["id"] = i.id
        batch_dic.append(temp)
        
    branch_dict = []
    for i in branchs:
        temp = {}
        temp["name"] = i.branches
        temp["id"] = i.id
        branch_dict.append(temp)
    data = {}
    data["updata"] = {"reg":reg_dic, "branch": branch_dict,"batch": batch_dic}
          
    return JsonResponse(data)



def get_back_predata(request):
    regs = Regulation.objects.all()
    batchs = Batch.objects.all()
    branchs = Branch.objects.all()
    sems =  Semester.objects.all()
    
    reg_dic = []
    for i in regs:
        temp = {}
        temp["title"] = i.regulation
        temp["id"] = i.id
        temp["name"] = f"{i}"
        reg_dic.append(temp)
    batch_dic = []
    for i in batchs:
        temp = {}
        temp["name"] = i.name
        temp["reg"] = i.reg.regulation
        temp["id"] = i.id
        batch_dic.append(temp)
        
    branch_dict = []
    for i in branchs:
        temp = {}
        temp["name"] = i.branches
        temp["id"] = i.id
        branch_dict.append(temp)
    sem_dic = []
    for i in sems:
        temp = {}
        temp["name"] = i.name
        temp["id"] = i.id
        temp["reg"] = i.regulation.regulation
        temp["batch"] = i.batch.name
        temp["branch"] = i.branch.branches
        sem_dic.append(temp)
    data = {}
    data["updata"] = {"reg":reg_dic, "branch": branch_dict,"batch": batch_dic,"sem":sem_dic}
    print(data)
    return JsonResponse(data)


# @api_view(['POST'])
# def test(request):
#     if request.method == "POST":
#         print(request.data)
#         return JsonResponse(request.data)



# controller to get batch student sem analysis of all sems
def get_batch_analysis(request, batch_id, branch_id): 
    batch = Batch.objects.get(id=batch_id)
    branch = Branch.objects.get(id=branch_id)
    sems = Semester.objects.filter(batch=batch,branch=branch)
    data = all_sems_analysis(sems, batch, branch)
    return JsonResponse(data,safe=False)



# # controller to get sems with backlog details

def get_all_sems_backlog(request,batch_id,branch_id):
    batch = Batch.objects.get(id=batch_id)
    branch = Branch.objects.get(id=branch_id)
    sems = Semester.objects.filter(batch=batch,branch=branch)
    data = get_sem_wise_backlog_analysis(sems,batch,branch)
    sem_data = {"sems":data}
    return JsonResponse(sem_data,safe=False)





def fetch_result(request,roll,branch,sem):
    result = get_formated_result(roll,branch)
    # print(result)
    student = Student.objects.get(roll=roll)
    print(f"Branch : {student.branch} Regultaion : {student.regulation} Batch: {student.batch} Section: {student.section}")
    result = result[str(sem)]
    # supply = result[f"{sem}-Supply"]
    subj = get_subject_from_fetch_obj(result)

    sem = check_sem_exist(result,student.branch,student.batch,student.regulation,sem,subj)
    
    add_subject(result,roll,sem)
    add_preformance_table(roll,sem)
    
    return JsonResponse(result, safe=False)


@sync_to_async
def reduced_fetch_semester_result(batch,sem,branch):
    if not Batch.objects.filter(id=batch).exists() and Branch.objects.filter(branches=branch.upper()).exists():
        print("!!!  .....   INVALID DETAILS")
        return

    batch  = Batch.objects.get(id=batch)
    branch_obj = Branch.objects.get(branches=branch.upper())
    students = Student.objects.filter(batch=batch,branch=branch_obj)

    print("-------------------------------------------------------------------------------------------------")


    for i in students:
        time.sleep(10)
        try:
            print(i)
            fetch_and_add_student_sem(i.roll.upper(),sem,branch)
        except Exception as e: 
            print("---")
            print(e)
            return

    
    
    # for i in range(5):
    #     time.sleep(10)
    #     fetch_and_add_student_sem(students[i].roll.upper(),sem,branch)
    
    # print("="*40)
    # print("\n\n\n")
    
    # print("successfully completed process")
    

    
# def fetch22(batch,sem,branch):
#     asyncio.create_task(reduced_fetch_semester_result(batch,sem,branch))

    


# @sync_to_async
async def fetch_semester_result(request,batch,sem,branch):
    asyncio.create_task(reduced_fetch_semester_result(batch,sem,branch))

    return JsonResponse({"response":"started Fetching"},safe=False)


def check_sem_data_exists(request,batch,sem,branch):

    try:
        flag = fetch_check_result(batch,sem,branch) 
        if flag == 0:
            return JsonResponse({"code":"danger","msg":"Semester Result not found in the server .... !!!"}, safe=False)
        elif flag == 1:
            return JsonResponse({"code":"success","msg":"Semester Result has started fetching data from server, wait for while"},safe=False)
    
    except Exception as e: 
        print(e)
        return JsonResponse({"code":"danger","msg":"IMS Server Not Responding .... !!!"}, safe=False)


def test5(num):
    print('inside test5')
    time.sleep(50)

@sync_to_async
def testtttt(num):
    time.sleep(10)
    test5(num)
    print(num)


async def helper(num):
    global t1
    t1 = asyncio.create_task(testtttt(num))

def fetch_test(request,num):
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    # Run the coroutine containing tasks
    # cancelAfter = 5
    asyncio.run(helper(num))

    return JsonResponse({"sent":num},safe=False)


async def cancel(request):
    t1.cancel()
    print("cancelled")

    return JsonResponse({"cancelled":"yes"},safe=False)





# Toppers Data API for single semester


# def get_sec_wise_topper_data(request,batch,sem,branch,sec):
#     sem = convert_num_to_sem(sem)
#     batch  = Batch.objects.get(id=batch)
#     branch_obj = Branch.objects.get(branches=branch.upper())
#     sem = Semester.objects.get(batch=batch,branch=branch_obj,name=sem)
#     students = Student.objects.filter(batch=batch,branch=branch_obj,section=sec)
#     # firoz = Student.objects.filter(roll="20135A0516").values()
#     # print(firoz)

#     for i in students:
#         print(i)
    
#     print('--------------------------------')

#     performance =  Performance.objects.filter(batch=batch,regulation=sem.regulation,sem=sem,roll__in=students).order_by('-SCGPA')
#     k = 0
#     data = []
#     for i in performance:
#         if k==20:
#             break
#         data.append({"roll":i.roll.roll,"name":i.roll.name,"sect":i.roll.section,"SCGPA":i.SCGPA})
#         k+=1
#     print(*data)
#     return JsonResponse({"data":data},safe=False)






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

def get_individual_sem_analysis(request,roll):
    if Student.objects.filter(roll=roll).exists():
        stu=Student.objects.get(roll=roll)
        sems =  Performance.objects.filter(roll=stu)
        data={"cgpas":[None,None,None,None,None,None,None,None],"roll":roll}

        std = StudentDetails.objects.get(roll=stu)
        details = {
            "name":std.name,
            "email":std.alter_mail,
            "mobile":std.mobile,
            "dob":std.dobstr,
            "father":std.father,
            "aadhar":std.aadhar,
            "address":std.address,
            "roll":stu.roll,
            "section":stu.section,
            "branch":stu.branch.branches
        }

        for sem in sems:
            if sem.sem.name=="I":
                data["cgpas"][0]=sem.SCGPA
            elif sem.sem.name=="II":
                data["cgpas"][1]=sem.SCGPA
            elif sem.sem.name=="III":
                data["cgpas"][2]=sem.SCGPA
            elif sem.sem.name=="IV":
                data["cgpas"][3]=sem.SCGPA
            elif sem.sem.name=="V":
                data["cgpas"][4]=sem.SCGPA
            elif sem.sem.name=="VI":
                data["cgpas"][5]=sem.SCGPA
            elif sem.sem.name=="VII":
                data["cgpas"][6]=sem.SCGPA
            elif sem.sem.name=="VIII":
                data["cgpas"][7]=sem.SCGPA
        data["details"]= details
        # print(details)
        return JsonResponse(data,safe=False)
    else:
        data={"cgpas":[None,None,None,None,None,None,None,None],"roll":roll}
        return JsonResponse(data)





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



def get_subj_section_data(request,sem_id):
    top_data = get_topper_data(sem_id)
    dsecs = get_sect_data(sem_id)
    # print(dsecs)
    sem = Semester.objects.get(id=sem_id)
    # sem = convert_num_to_sem(sem)
    batch  = Batch.objects.get(id=sem.batch.id)
    branch_obj = Branch.objects.get(id=sem.branch.id)
    students = Student.objects.filter(batch=batch,branch=branch_obj)
    # secs = lst_of_sect_of_sem(students)
    # print(secs)
    secs = []
    for i in dsecs["data"]:
        secs.append(i["name"])
    sectionTopData = get_sec_wise_topper_data(sem_id,secs)
    # print(sectionTopData)
    # print(sec_data)
    subjs = sem.subject.split(',')
    # print(subjs)
    fails = get_section_fail_perc(sem_id,secs)
    data = []
    for i in subjs:
        code,name = i.split('-')[0],i.split('-')[1:]

        l = get_pass_fail_count_of_each_subject(code,i,secs,sem,branch_obj,batch)
        # msg = f"result Analysis for subject : {name} and analysis = {l}"
        data.append(l)
        # subj_data = Subjects.objects.filter(sem=sem,batch=batch,branch=branch_obj,roll=)

    sectionTopData["onlysections"] = secs
    
    temp = {"subjSectionData":data,"sectionList":dsecs,"semtopData":top_data,"failPercentageSection":fails,"onlysections":secs,"eachSectionTopData":sectionTopData}
    return JsonResponse({"data":temp},safe=False)








def get_roll_details(roll):
    rolld = Student.objects.get(roll=roll)

    if StudentDetails.objects.filter(roll=rolld).exists() :
        data = StudentDetails.objects.get(roll=rolld)
    else:
        data = fetchDetails(roll)
        dob = data[3]
        dob = datetime.strptime(dob,"%d/%m/%Y")
        data = StudentDetails.objects.create(roll=rolld,name=data[0],father=data[1],mother=data[2],
            dobstr=data[3],dob=dob,nationality=data[5],religion=data[6],
            father_occupation= data[7],mother_occupation=data[8], mobile=data[10],
            alter_mobile=data[11],mail=data[13],alter_mail=data[14],aadhar=data[15],
            address=data[23]
            )

    k = {"roll":data.roll.roll,"name":data.name,"father":data.father,"mother":data.mother,
            "dob":data.dobstr,"religion":data.religion,"fatherOccupation":data.father_occupation,
            "Aadhar":data.aadhar,"mai":data.mail, "AlterMail":data.alter_mail,
            "address":data.address
            }
    
    return k




def get_fetch_data(request):
    branchs = Branch.objects.all().order_by('id')
    regs = Regulation.objects.all().order_by('id')
    data = []
    regdata = []
    branchData = []

    for branch in branchs:
        t = {}
        t[f"{branch.branches}"] = branch.branches
        branchData.append(t)

    for reg in regs:
        p = {}
        p["id"] = reg.id
        p["name"] = reg.regulation
        regdata.append(p)
        batchs = Batch.objects.filter(reg=reg).order_by('reg')
        for batch in batchs:
            k = {}
            k["id"] = batch.id
            k["name"] = batch.name
            k["reg"] = batch.reg.id
            data.append(k)
    finalData = {}
    finalData["regData"] = regdata
    finalData["batchData"] = data
    finalData["branchData"] = branchData

    return JsonResponse({"data":finalData},safe=False)


def check_student_exists(request,roll):
    if Student.objects.filter(roll=roll).exists():
        get_roll_details(roll)
        return JsonResponse({"code":"success","msg":"Student Exists in Server DataBase..  Fetching Result data just wait for  a few Seconds"})
    else:
        return JsonResponse({"code":"danger","msg":"Student Roll number doesn't exists in the Server DataBase please check roll and try again"})


def student_report(request,roll):
    if Student.objects.filter(roll=roll).exists():
        pass












# -------------------------- FILTER DATA PAGE FUNCTIONS -----------------------


def fetchdata1(request):
    data = {}
    branchs = Branch.objects.all()
    regs = Regulation.objects.all()


    branch = [{"id":"all", "name":"Select All"}]
    for i in branchs:
        d = {}
        d["name"] = i.branches
        d["id"] = i.id
        branch.append(d)

    reg = [{"id":"all", "name":"Select All"}]

    for i in regs:
        d = {}
        d["name"] = f"{i.regulation} for year {i.year}"
        d["id"] = i.id
        reg.append(d)

    data["branch"] = branch
    data["regulation"] = reg
    data["status"] = True

    print(data)

    return JsonResponse(data,safe=True)







# this function will return list of batch for particular regulation

def fetchdata2(request,reg):
    reg = int(reg)

    if Regulation.objects.filter(id=reg).exists():
        reg = Regulation.objects.get(id=reg)
        batchs = Batch.objects.filter(reg=reg)

        data = {}
        data["batch"] = [{"id":"all", "name":"Select All"}]

        for i in batchs:
            d = {}
            d["name"] = f"batch {i.name}  for {i.reg.regulation}"
            d["id"] = i.id
            data["batch"].append(d)
        
        data["status"] = True

        # print(data)

        return JsonResponse(data,safe=True)
    else:
        data = {}
        data["batch"] = []

        data["status"] = False
        # print(data)
        # print(Regulation.objects.filter(id=reg))

        return JsonResponse(data,safe=True)












# this function will return section details and sems details 

def fetchdata3(request,reg,branch,batch):

    if batch == "all":
        regData = Regulation.objects.get(id=reg)
        branchData = Branch.objects.get(id=branch)

        students = Student.objects.all().filter(regulation=regData,branch=branchData)
        sect = get_section_list(students)
        data = {}
        data["section"] = ["all"]
        data["section"].extend(list(sect.keys()))

        sems = Semester.objects.all().filter(regulation=regData, branch=branchData)

        data["sems"] = []

        for i in sems:
            d = {}
            d["name"] = i.name
            d["id"] = i.id
            data["sems"].append(d)
        
        data["status"] = True

        return JsonResponse(data,safe=True)
        

    elif Regulation.objects.filter(id=reg).exists() and Branch.objects.filter(id=branch).exists() and Batch.objects.filter(id=batch).exists():
        regData = Regulation.objects.get(id=reg)
        branchData = Branch.objects.get(id=branch)
        batchData = Batch.objects.get(id=batch)

        students = Student.objects.all().filter(regulation=regData, batch=batchData,branch=branchData)
        sect = get_section_list(students)
        data = {}
        data["section"] = ["all"]
        data["section"].extend(list(sect.keys()))

        sems = Semester.objects.all().filter(regulation=regData, batch=batchData,branch=branchData).order_by("name")
        data["sems"] = [{"id":"all", "name":"Select All"}]

        for i in sems:
            d = {}
            d["name"] = i.name
            d["id"] = i.id
            data["sems"].append(d)
        
        data["status"] = True

        return JsonResponse(data,safe=True)
    else:
        data = {}
        data["section"] = []
        data["sems"] = []
        data["status"] = False

        return JsonResponse(data,safe=True)





# this function will response to POST request and return filtered Data
   
@csrf_exempt
def filter(request):
    if request.method == "POST":

        # branch,reg,batch,sems,cgpa,backlog,sect
        reg = request.POST.get("reg")
        branch = request.POST.get("branch")
        batch = request.POST.get("batch")
        sems = request.POST.get("sems")
        cgpa = request.POST.get("cgpa")
        backlog = request.POST.get("backlog")
        sect = request.POST.get("sect")


        reg = Regulation.objects.get(id=reg)
        branch = Branch.objects.get(id=branch)
        batch = Batch.objects.get(id=batch)
        # sems = Semester.objects.get(id=sems)

        # all  1 = cgpa > 9, 2 =  cgpa > 8 , 3 =  cgpa > 7 , 4 =  cgpa > 6 , 5 =  cgpa > 5 , 6  =  cgpa < 5

        # clear   1 , 2 , 3 , 4 , 5 = backlog > 4
        # gpa = {"all":"all",1:9,2:8,3:7,4:6,5:5,6:4}

        
        data = {"data":[branch,reg,batch,sems,cgpa,backlog,sect]}
        print(data)
        
        sm = []
        if "all" not in sems:
            for i in sems.split(","):
                sm.append(Semester.objects.get(id=int(i)))
        else:
            for i in Semester.objects.all().filter(regulation=reg,branch=branch,batch=batch):
                sm.append(i)
            # sm.append(Semester.objects.filter(regulation=reg,branch=branch,batch=batch))
        # print(sm)


        perform = [filteredStudents(branch,reg,batch,sem,sect,backlog,cgpa) for sem in sm]
        


        # for sem in sm:
        #     student = filteredStudents(branch,reg,batch,sem,sect,backlog,cgpa)
        #     students.append(student)

        # print(perform)

        

        detail = tableDetails(perform)
        data = {}
        data["data"] = detail




        # print(branch,reg,batch,sems,cgpa,backlog,sect)
        return JsonResponse(data,safe=True)
    else:
        return JsonResponse({"data":False})











