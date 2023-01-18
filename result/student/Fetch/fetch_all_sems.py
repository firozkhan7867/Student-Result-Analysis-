from student.models import Performance
from student.models import Subjects
from student.models import Student
from student.models import Regulation
from student.models import Semester,Batch,BacklogSubject,Attempt
from django.http.response import HttpResponse, JsonResponse
from student.Fetch.main_code import get_formated_result
from student.back_log_handler import add_backlog, add_student_performance, update_subject


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

        if sem not in list(stud_obj.sem.all()):
        #     print(sem)
        # else:
            print("does not exists")
            # for i in list(stud_obj.sem.all()):
            #     if i == sem:
            #         print("matched", sem,"--------------------", i )
            stud_obj.sem.add(sem)
            stud_obj.save()
        else:
            print("alredy sem exists in student record")
            
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




def add_subject(result,roll,sem):
    for i in result:
        # print(i)
        check_subject_fetch(roll,i,sem)
    # print(roll)
    # print(sem)


def get_subject_from_fetch_obj(result):
    subj_list = ""
    data = result[0]["SubjectCode"] + "-"+result[0]["SubjectName"] 
    subj_list += data

    for i in result[1:]:
        data = ""
        data +=   "," + i["SubjectCode"] + "-"+i["SubjectName"] 
        subj_list +=  data.strip()
    
    return subj_list


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


def check_sem_exist_supply(result,branch,batch,reg,sem,subj):
    sems = Semester.objects.all().filter(regulation=reg,branch=branch,batch=batch)
    # print("sems" , sems)
    sem_names = {1:"I",2:"II",3:"III",4:"IV",5:"V",6:"VI",7:"VII",8:"VIII"}

    for  i in sems:
        if i.name == sem_names[sem]:
            print("!!! ....  sem Exists")
            return [True ,i]
    
    print("Semester Data doesn't exists to add The supply details for the student")

    return [False, 0]



        
def add_attempt_details(subject,sem,data,student_roll,attendance_data,batch,credit_data,result_data,grade_data,cgpa_data):
    
    sbj = Subjects.objects.get(id=subject.id)
    if sbj.fail == False:
        return None
    
    if result_data.lower() == "p":
        passed = True
    else:
        passed = False
        
    attmpt = Attempt(roll=student_roll,subj=subject,sem=sem,
                     batch=batch,credit=credit_data,result=result_data,
                     attendance=attendance_data,grade=grade_data,cgpa=cgpa_data,passed=passed)
    attmpt.save()
    attmpt.back_log.add(data)
    attmpt.save()
    
    backsubj = BacklogSubject.objects.get(id=data.id)
    backsubj.count += 1
    backsubj.passed = passed
    backsubj.save()
    
    if passed == True:
        update_subject(attmpt)
    

def add_attempt_fetch(Roll, Attendance,Result,Credit,Grade,CGPA,subj_name,sem):
    credit = float(Credit)
    batch = Batch.objects.get(id=sem.batch.id)
    cgpa = float(CGPA)
    
    student_roll = Student.objects.get(roll=Roll)
    if BacklogSubject.objects.filter(roll=student_roll).exists():
        back_subj_data = BacklogSubject.objects.all().filter(roll=student_roll)
        if len(back_subj_data) > 1:
            for back_data in back_subj_data:
                if back_data.subject.name == subj_name:
                    add_attempt_details(back_data.subject,back_data.sem,back_data,student_roll,Attendance,batch,credit,Result,Grade,CGPA)
        else:
            back_data = back_subj_data[0]
            if back_data.subject.name == subj_name:
                add_attempt_details(back_data.subject,back_data.sem,back_data,student_roll,Attendance,batch,credit,Result,Grade,CGPA)
               



def check_subject_fetch_supply(roll,subj_obj,sem):

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

        # if sem not in stud_obj.sem.all():
        #     print(sem)
        # else:
        #     print("does not exists")
        #     stud_obj.sem.add(sem)
        #     stud_obj.save()
        if sem not in list(stud_obj.sem.all()):
        #     print(sem)
        # else:
            print("does not exists")
            # for i in list(stud_obj.sem.all()):
            #     if i == sem:
            #         print("matched", sem,"--------------------", i )
            stud_obj.sem.add(sem)
            stud_obj.save()
        else:
            print("alredy sem exists in student record")
    
        # sem = stud_obj.sem
        # if Subjects.objects.filter(regulation=regulation,branch=branch,sem=sem,roll=stud_obj,name=name,code=code,batch=batch).exists():
        #     print(f"!!! .... Subject for {stud_obj.roll} cannot be created for {name}")
        #     return
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

        try:
            add_attempt_fetch(stud_obj.roll,attendance,result,credit,grade,cgpa,name,sem)
        except Exception as e: 
            print("----------------------     ERROR ....!!!!!!        ----------------------------")
            print(e)
            return        
    
        print(f"---    ---    ---    ---   Backlog   subject created for {stud_obj.roll} of {name}")
    else:
        print(f"Subject for {roll} not found of {name} ")




def add_supply_backlog(value,student,sem):
    for i in value:
        check_subject_fetch_supply(student,i,sem)

def fetch_and_add_student_all_sem(roll,branch):
    student = Student.objects.get(roll=roll)
    branch_obj = student.branch
    result = get_formated_result(roll,branch)
    print(f"Branch : {student.branch} Regultaion : {student.regulation} Batch: {student.batch} Section: {student.section}")
    # print(result)
    # print(len(result),result.keys())
    # result = result[str(sem)]
    for key,value in result.items():
        if '-' in key:
            print("Supply",key)
            # sem = check_sem_exist(result,student.branch,student.batch,student.regulation,sem,subj)
            if len(result[key]) > 0:
                key = key.split('-')[0]
                subj = get_subject_from_fetch_obj(value)
                semInfo = check_sem_exist_supply(value,student.branch,student.batch,student.regulation,int(key),subj)
                if semInfo[0] == True:
                    sem = semInfo[1]
                    try:
                        add_supply_backlog(value,student.roll,sem)
                    except Exception as e: 
                        print("----------------------     ERROR ....!!!!!!        ----------------------------")
                        print(e)
                        return

                # print(subj)
                # data[key] = result[key]
            else:
                print(key, 'No Data Found')
        else:
            print("sem data",key)

            # working on ADD ATTEMP BACKLOG ----------------




            if len(result[key]) > 0:
                subj = get_subject_from_fetch_obj(value)
                print(key) 
                sem = check_sem_exist(result,student.branch,student.batch,student.regulation,int(key),subj)
                add_subject(result[key],roll,sem)
                add_preformance_table(roll,sem)
                # print(value)
    # print(data)
    # return JsonResponse({}, safe=False)
    # if len(result) == 0:
    #     msg= f"\n\n\n \t Data not exists !!!!!!!!!!  --------- SKipping the student {roll}  sem: {sem} branch: {branch} \n\n\n\n"
    #     print(msg)
    #     return {"error":msg}

    # print("-------------------------========================================--------------------------------")
    # print(subj)
    
    # print("-------------------------========================================--------------------------------")

    # sem = check_sem_exist(result,student.branch,student.batch,student.regulation,sem,subj)

    # add_subject(result,roll,sem)
    # add_preformance_table(roll,sem)

    msg = f"successfully added student data of {roll} sem:{sem} branch: {branch}"


    return {"success": msg}