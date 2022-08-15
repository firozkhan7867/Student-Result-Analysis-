from ..models import Student, Subjects
from django.db.models import Count,Value,Case,When,F,DecimalField,Q,IntegerField


def get_pass_fail_count_of_each_subject(code,name,secs,sem,branch,batch):
    k = {}
    k["subject_name"] = name
    for sec in secs:
        students = Student.objects.filter(batch=batch,branch=branch,section=sec)
        passCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="P",then=1),output_field=IntegerField())))
        failCount = Subjects.objects.filter(roll__in=(students),code=code).aggregate(total=Count(Case(When(result__icontains="F",then=1),output_field=IntegerField())))
        k[f"section-{sec}-Pass"] = passCount["total"]
        k[f"section-{sec}-Fail"] = failCount["total"]
        # l.append(msg)

    return k



        

