# from students.models import Semester
from student.models import Student, Batch, Performance



# returns list of all the (Stundets) roll numbers present in the batch and branch
def get_all_roll_of_batch(sem,batch_id, branch_id):
    students = Student.objects.filter(batch=batch_id, branch=branch_id)
    roll = []
    for i in students:
        if sem in i.sem.all():
            roll.append(i.roll)
    return roll


#returns the list of students whos data is present in all the semester for the particular batch and branch
def get_roll_in_all_subject(rolls, no_of_sems):
    roll = []
    for i in rolls:
        if rolls.count(i) == no_of_sems:
            roll.append(i)
    return sorted(set(roll))


def get_cgpa_roll(roll):
    roll = Student.objects.get(roll=roll)
    total = 0
    for i in roll.sem.all():
        performance = Performance.objects.get(sem=i.id,roll=roll)
        total += performance.SCGPA
    cgpa = total/len(roll.sem.all())
    return {roll.roll:{"CGPA":cgpa}}
        
    


def all_sems_analysis(sems, batch_id, branch_id):
    rolls = []
    for sem in sems:
        rolls += get_all_roll_of_batch(sem, batch_id , branch_id)
    # roll = get_all_roll_of_batch(sems, batch_id , branch_id)
    roll = get_roll_in_all_subject(rolls, len(sems))
    data = []
    for i in roll:
        cgpa = get_cgpa_roll(i)
        data.append(cgpa)
    print(data)
            
    
    
    
    
    
    
    
 