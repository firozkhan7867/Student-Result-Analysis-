import calendar
import json
from math import ceil
import requests as req


def getResult(rno,branch):
    BASE_URL="http://123.108.200.174/studresult?"
    URL=BASE_URL+"rollno="+rno+"&"+"branch="+branch
    res=req.get(URL)
    res = json.loads(res.text)
    return res

# d=getResult("20135A0514","CSE")
# print(len(d))
# print(d)

# to get the result pass student roll and BRANCH)
# result=getResult("16131A0599","CSE")

def get_formated_result(roll,branch):
    result = getResult(roll,branch)
    # result = getResult("18131A0525","CSE")
    mdata={}
    index=0
    for value in result:
        value=value[0:len(value)-1]
        tmp=value.split("@")
        span=len(tmp)
        # print(tmp)
        data=[]
        index1=0
        for value1 in tmp:
            if tmp[0] != " ":
                tmp1=value1.split(";")
                try:
                    month=calendar.month_name[int(tmp1[8])]
                except:
                    month=""
                if month:
                    data.append({"SNo":index1+1, "SubjectCode":tmp1[1], "SubjectName":tmp1[2], "SubjectType":tmp1[3], "AttendanceGrade":tmp1[4], "Credits":tmp1[5], "ResultGrade":tmp1[6], "CreditsPoints":tmp1[7], "DateOfRelease":tmp1[9]})
            index1+=1
        if index % 2 == 0:
            name=str(int((index/2+1)))
        else:
            name=str(ceil(index/2))+"-Supply"
        mdata[name]=data
        index+=1
    return mdata

# print(mdata)
# for i,j in mdata.items():
#     print(i,j)

# print(get_formated_result("s","sf")["7"])







