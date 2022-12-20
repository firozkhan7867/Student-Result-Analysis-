from ..models import Student, Subjects
from django.db.models import Count,Value,Case,When,F,DecimalField,Q,IntegerField


def get_pass_fail_count_of_each_subject(code,name,secs,sem,branch,batch):
    k = {}
    k["subject_name"] = name
    # print(code,name,secs,sem,branch,batch)
    for sec in secs:
        students = Student.objects.filter(batch=batch,branch=branch,section=sec)
        passCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="P",then=1),output_field=IntegerField())))
        failCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="F",then=1),output_field=IntegerField())))
        k[f"section-{sec}-Pass"] = passCount["total"]
        k[f"section-{sec}-Fail"] = failCount["total"]
        # l.append(msg)

    return k

def get_pass_fail_count_of_each_subject_for_table(code,name,secs,sem,branch,batch):
    k = {}
    k["subj"] = name
    k["code"] = code
    k["cc"] = name
    data = []

    
    

    for sec in secs:
        p = {}
        p["sect"] = sec
        ana = {}
        students = Student.objects.filter(batch=batch,branch=branch,section=sec)
        passCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="P",then=1),output_field=IntegerField())))
        failCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="F",then=1),output_field=IntegerField())))
        ana["passed_student"] = passCount["total"]
        ana["fail"] = failCount["total"]
        
        si = Subjects.objects.filter(roll__in=(students),code=code)[0]
        
        if si.subjtype == True:
            ana["total_student"] = len(Subjects.objects.filter(roll__in=(students),code=code))
        else:
            ana["total_student"] = len(list(students))
        ana["Pass_percentage"] = int((passCount["total"]-failCount["total"] )/ ana["total_student"] *100)
        p["analysis"] = ana
        data.append(p)
        # l.append(msg)
    k["data"] = data
    return k



        

