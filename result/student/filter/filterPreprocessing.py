from student.models import Performance
from student.models import Student







def filteredStudents(branch,reg,batch,sem,sect,backlog,cgpa):
    if sect == "all":
        st = Student.objects.all().filter(branch=branch,regulation=reg,batch=batch)
    else:
        st = Student.objects.all().filter(branch=branch,regulation=reg,batch=batch,section=int(sect))
    

    # backlog code
    if backlog == "clear":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=True,no_of_backlog=0).only("roll").distinct()
    elif backlog == "all":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False).only("roll").distinct()
    elif str(backlog) == "1":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False,no_of_backlog=1,had_backlog=True).only("roll").distinct()
    elif str(backlog) == "2":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False,no_of_backlog=2,had_backlog=True).only("roll").distinct()
    elif str(backlog) == "3":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False,no_of_backlog=3,had_backlog=True).only("roll").distinct()
    elif str(backlog) == "4":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False,no_of_backlog=4,had_backlog=True).only("roll").distinct()
    elif str(backlog) == "5":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,passed=False,no_of_backlog__gte=4,had_backlog=True).only("roll").distinct()
    

    # print(perform)
    # print("-----------------------------------")
    
    st = [i.roll for i in perform]

    # for i in perform:
    #     st.append(i.roll)
    

    if str(cgpa) == "all":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem)
    elif str(cgpa) == "9":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__gte=9).only("roll").distinct()
    elif str(cgpa) == "8":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__gte=8).only("roll").distinct()
    elif str(cgpa) == "7":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__gte=7).only("roll").distinct()
    elif str(cgpa) == "6":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__gte=6).only("roll").distinct()
    elif str(cgpa) == "5":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__gte=5).only("roll").distinct()
    elif str(cgpa) == "4":
        perform = Performance.objects.all().filter(roll__in=(st),sem=sem,SCGPA__lte=5).only("roll").distinct()


    
        
    
    # print(perform)
    # print(len(perform))

    return perform


    # Retrieving student numbers after 

    # cgpa code

    
    
    

def tableDetails(performs):
    # print(performs)


    d = {}

    for perform in performs:
        # print(per)
        for per in perform:
            if per.roll.roll not in d:
                detail = {}
                detail["name"] = per.roll.name
                detail["sect"] = per.roll.section
                detail["roll"] = per.roll.roll
                detail["email"] = per.roll.roll + "@gvpce.ac.in"

                detail["sem"] = [{"sem":f"{per.sem.name} Semeseter","scgpa":per.SCGPA,"backlogs":per.no_of_backlog}]

                d[per.roll.roll] = detail
            else:
                d[per.roll.roll]["sem"].append({"sem":f"{per.sem.name} Semeseter","scgpa":per.SCGPA,"backlogs":per.no_of_backlog})
    # print("---------------")
    # print(d)
    k = []

    for i in d:
        k.append(d[i])
    return k
        