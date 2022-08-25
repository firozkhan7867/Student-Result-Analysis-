import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { connect } from 'react-redux';



// import btns from "./semsbtn.json"
const  ToppersData = ({subjSectAnalysisdata,toppersData}) => {
    // const getdata = JSON.parse(localStorage.getItem("subjSectAnalysis"));
    const getdata = toppersData;
    // console.log(getdata);
    // console.log(toppersData);
    const [section, setsection] = useState(JSON.parse(localStorage.getItem("subjSectAnalysis")).eachSectionTopData.allSection);
    // console.log(section);
    const [sec, setsec] = useState("allSection");



    // const data = getdata.semtopData;
    var sectionData = getdata.onlysections;
    // var data2 = eachsection[section];
    // console.log(sectionData);


    const check = (e) =>{
        // setsection(`${e}`);
        // data2 = eachsection[section];
        setsection(getdata[`${e}`]);
        setsec(e);
    }

    return (
        <div className=''>
            <div className="text-center">
                <h4 className='p-2 rounded'>Section - <strong className='mx-2'> {sec}</strong> Data</h4>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Roll number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Sec</th>
                    <th scope="col">SCGPA</th>
                    </tr>
                </thead>
                <tbody>

                    {section.map((value,index)=>{
                        return(
                            // {"roll":i.roll.roll,"name":i.roll.name,"sect":i.roll.section,"SCGPA":i.SCGPA
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{value.roll}</td>
                                <td>{value.name}</td>
                                <td>{value.sect}</td>
                                <td>{value.SCGPA}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <p  onClick={() => check("allSection")} className="btn btn-primary">ALL</p>
                {sectionData.map((value,index) => {
                    return (
                        <p key={index} onClick={() =>check(value)} className="btn btn-primary">section-{value}</p>
                    )
                })}
            </div>
        </div>
    )
}
 

const mapStateToProps = state => ({
    subjSectAnalysisdata: state.auth.subjSectAnalysis,
    toppersData:state.auth.toppersData
});


export default connect(mapStateToProps,null)(ToppersData);