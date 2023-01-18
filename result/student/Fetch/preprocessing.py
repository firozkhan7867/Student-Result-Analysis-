from student.back_log_handler import add_backlog
from ..models import Batch, Branch
from student.Fetch.main_code import get_formated_result
from student.back_log_handler import add_student_performance
from student.models import Performance
from student.models import Subjects
from student.models import Student
from student.models import Regulation
from student.models import Semester
from django.db.models import Count,Value,Case,When,F,DecimalField,Q,IntegerField

from student.analysis.sem_analysis import title_and_code,subj_analysis_one_more


def check_subject_fetch(roll,subj_obj,sem):

    if Student.objects.filter(roll=roll).exists():
        stud_obj = Student.objects.get(roll=roll)
        regulation = stud_obj.regulation
        branch = stud_obj.branch
        batch = stud_obj.batch
        name = subj_obj["SubjectName"].upper()
        code = subj_obj["SubjectCode"]
        subtype = subj_obj["SubjectType"].upper()

        if subtype == "PROFESSIONAL CORE COURSE":
            subt = "PROFESSIONAL CORE COURSE"
            type = False
        else:
            subt = subtype
            type= True

        

        if sem not in stud_obj.sem.all():
            print(sem)
        else:
            print("does not exists")
            stud_obj.sem.add(sem)
            stud_obj.save()
            

        # sem = stud_obj.sem
        if Subjects.objects.filter(regulation=regulation,branch=branch,sem=sem,roll=stud_obj,name=name,code=code,batch=batch).exists():
            print(f"!!! .... Subject for {stud_obj.roll} cannot be created for {name}")
            return
        attendance = subj_obj["AttendanceGrade"]
        grade = subj_obj["ResultGrade"]
        cgpa = subj_obj["CreditsPoints"]
        credit = subj_obj["Credits"]

        

        
        result = "P"
        fail = False
        if grade == "F" or grade == "AB":
            result = "F"
            fail = True
        # if attendance.lower() == "d":
        #     fail = True
        #     result = "F"
        #     credit = 0
        
        if credit == "--" or grade == "--" or cgpa == "--":
            result = "F"
            fail = True
            credit = 0
            grade="AB"
            cgpa = 0

        
        subj = Subjects.objects.create(roll=stud_obj,name=name,regulation=regulation,branch=branch,batch=batch,attendance=attendance,
        cgpa=cgpa,result=result,fail=fail,sem=sem,credit=credit,code=code,grade=grade,subjtype=type, type=subt)

        if subj.result == "F":
            add_backlog(subj,stud_obj)


        
    
        print(f"subject created for {stud_obj.roll} of {name}")
    else:
        print(f"Subject for {roll} not found of {name} ")






def add_subject(result,roll,sem):
    for i in result:
        # print(i)
        check_subject_fetch(roll,i,sem)

    # print(roll)
    # print(sem)


def sem_name_convert(sem):
    sem_names = {1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII"}
    return sem_names[sem]

def check_sem_exist(result,branch,batch,reg,sem,subj):
    sems = Semester.objects.all().filter(regulation=reg,branch=branch,batch=batch)
    # print("sems" , sems)
    sem_names = {1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII"}

    for  i in sems:
        if i.name == sem_names[sem]:
            print("!!! ....  sem Exists")
            return i
    
    print("Creating Sem Object")
    sem = Semester(name=sem_names[sem],regulation=reg,branch=branch,batch=batch,subject=subj)
    sem.save()

    return sem

    # ["201342-RNAIDA INADONP A","2332323-asjdnskjdna"]
    

def get_subject_from_fetch_obj(result):
    # print("*"*30)
    # print(result)
    subj_list = ""
    data = result[0]["SubjectCode"] + "-"+result[0]["SubjectName"] 
    subj_list += data

    for i in result[1:]:
        data = ""
        data +=   "," + i["SubjectCode"] + "-"+i["SubjectName"] 
        subj_list +=  data.strip()
    
    return subj_list
    

def get_no_of_pass_count(student,sem):
    subjs = Subjects.objects.filter(roll=student,branch=student.branch, regulation=student.regulation, batch=student.batch,sem=sem)
    pass_count = 0
    total_subject = 0
    fail_count = 0

    for i in subjs:
        if i.fail == True:
            fail_count +=1
        else:
            pass_count +=1
        total_subject +=1
    
    return [pass_count,total_subject,fail_count]



def add_preformance_table(roll,sem):

    student_roll = Student.objects.get(roll=roll)
    if not Performance.objects.filter(roll=student_roll,sem=sem).exists():
        registered_data, no_of_pass_data ,no_of_backlog = get_no_of_pass_count(student_roll,sem)
        # print("inside perr")
        per_data = add_student_performance(roll,sem)
        # print("inside agter")
        TCR  = per_data[0]
        TCP  = per_data[1]
        SCGPA  = per_data[2]
        student_roll = Student.objects.get(roll=roll)
        # no_of_backlog = registered_data - no_of_pass_data
        
        if no_of_backlog == 0:
            passed = True
            had_backlog = False
        else:
            passed = False
            had_backlog = True
            
        perform = Performance(roll=student_roll, regulation=sem.regulation,sem=sem,
                                registered=registered_data, no_of_pass=no_of_pass_data, 
                                no_of_backlog=no_of_backlog, passed=passed,
                                TCR=TCR, TCP=TCP, SCGPA=SCGPA, batch=student_roll.batch,had_backlog=had_backlog)
        perform.save()  
        get_perform = Performance.objects.get(id=perform.id)
        subjs = Subjects.objects.all().filter(sem=sem,roll=student_roll)
        for j in subjs:
            sub = Subjects.objects.get(id=j.id)
            get_perform.subject.add(sub)
            get_perform.save()
        
        print(f"Performance Table created Successfully for {student_roll} for semester : {sem}")
            
    else:
        print(f"!!! ....  Performance Table cannot not created for {student_roll} for semester : {sem}")




def fetch_and_add_student_sem(roll,sem,branch):
    student = Student.objects.get(roll=roll)
    branch_obj = student.branch
    result = get_formated_result(roll,branch)
    print(f"Branch : {student.branch} Regultaion : {student.regulation} Batch: {student.batch} Section: {student.section}")
    # print(result)
    result = result[str(sem)]

    if len(result) == 0:
        msg= f"\n\n\n \t Data not exists !!!!!!!!!!  --------- SKipping the student {roll}  sem: {sem} branch: {branch} \n\n\n\n"
        print(msg)
        return {"error":msg}
    subj = get_subject_from_fetch_obj(result)

    # print("-------------------------========================================--------------------------------")
    # print(subj)
    
    # print("-------------------------========================================--------------------------------")

    sem = check_sem_exist(result,student.branch,student.batch,student.regulation,sem,subj)

    add_subject(result,roll,sem)
    add_preformance_table(roll,sem)

    msg = f"successfully added student data of {roll} sem:{sem} branch: {branch}"
    

    return {"success": msg}
    # else:
    #     msg = f"Failed to add data for the student {roll} and sem: {sem} branch:{branch}"
    #     print(msg)
    #     return {"error":msg}








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
    
    return data


    
def fetch_check_result(batch,sem,branch):
    batch  = Batch.objects.get(id=batch)
    branch_obj = Branch.objects.get(branches=branch.upper())
    if not  Student.objects.filter(batch=batch,branch=branch_obj).exists():
        return 0
    roll = str(Student.objects.filter(batch=batch,branch=branch_obj)[0])
    result = get_formated_result(roll,branch)
    if int(sem) == 9:
        return 1
    # print(result[str(sem)])
    if len(result[str(sem)]) > 0:
        return 1
    else:
        return 0






def getSubjectDetails(students,sem,batch,reg,branch,code,name):
    k= []
    subs = Subjects.objects.all().filter(roll__in=(students),sem=sem,batch=batch,regulation=reg,branch=branch,code=code,name=name).order_by('roll')
    for sub in subs:
        data ={}
        data["id"] = sub.id
        data["roll"] = sub.roll.roll
        data["name"] = sub.roll.name
        data["credit"] = sub.credit
        data["attendance"] = sub.attendance
        data["grade"] = sub.grade
        data["cgpa"] = sub.cgpa
        data["result"] = sub.fail
        k.append(data)
    return k




# code from below is for digging dashboard


def getSemData(sem):
    reg = Regulation.objects.get(id=sem.regulation.id)
    branch = Branch.objects.get(id=sem.branch.id)
    batch = Batch.objects.get(id=sem.batch.id)
    students = Student.objects.filter(batch=batch,branch=branch,regulation=reg)
    # print(sem.subject)
    subj_list = sem.subject.split(',')
    title_code = title_and_code(subj_list)
    code = title_code[0]
    title = title_code[1]
    data = []
    for i in range(len(code)):
        k = {}
        d = getSubjectDetails(students,sem,batch,reg,branch,code[i],title[i])
        k["name"] = title[i]
        k["code"] = code[i]
        k["data"] = d
        data.append(k)
    return data
