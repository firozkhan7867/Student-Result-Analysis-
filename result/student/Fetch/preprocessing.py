from student.Fetch.main_code import get_formated_result
from student.back_log_handler import add_student_performance
from student.models import Performance
from student.models import Subjects
from student.models import Student
from student.models import Regulation
from student.models import Semester



def check_subject_fetch(roll,subj_obj,sem):
    if Student.objects.filter(roll=roll).exists():
        stud_obj = Student.objects.get(roll=roll)
        regulation = stud_obj.regulation
        branch = stud_obj.branch
        batch = stud_obj.batch
        name = subj_obj["SubjectName"].upper()
        code = subj_obj["SubjectCode"]
        # sem = stud_obj.sem
        if Subjects.objects.filter(regulation=regulation,branch=branch,sem=sem,roll=stud_obj,name=name,code=code).exists():
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
        
        
        subj = Subjects(roll=stud_obj,name=name,regulation=regulation,branch=branch,batch=batch,attendance=attendance,
        cgpa=cgpa,result=result,fail=fail,sem=sem,credit=credit,code=code,grade=grade)
        subj.save()
    
        print(f"subject created for {stud_obj.roll} of {name}")
    else:
        print(f"Subject for {roll} not found ")






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
    subj_list = ""
    data = result[0]["SubjectCode"] + "-"+result[0]["SubjectName"] 
    subj_list += data

    for i in result:
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
        per_data = add_student_performance(roll,sem)
        TCR  = per_data[0]
        TCP  = per_data[1]
        SCGPA  = per_data[2]
        student_roll = Student.objects.get(roll=roll)
        # no_of_backlog = registered_data - no_of_pass_data
        
        if no_of_backlog == 0:
            pass_or_fail = True
            had_backlog = False
        else:
            pass_or_fail = False
            had_backlog = True
            
        perform = Performance(roll=student_roll, regulation=sem.regulation,sem=sem,
                                registered=registered_data, no_of_pass=no_of_pass_data, 
                                no_of_backlog=no_of_backlog, pass_or_fail=pass_or_fail,
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
    subj = get_subject_from_fetch_obj(result)

    sem = check_sem_exist(result,student.branch,student.batch,student.regulation,sem,subj)
    
    add_subject(result,roll,sem)
    add_preformance_table(roll,sem)




