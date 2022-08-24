import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { connect } from 'react-redux';

import { CCard, CCardBody, CCardHeader} from '@coreui/react';
import "./Backlog.css";


// import btns from "./semsbtn.json"
const  Backlog = () => {
    //const getdata = JSON.parse(localStorage.getItem("subjSectAnalysis"));
    // console.log(getdata);
    // console.log(subjSectAnalysisdata);
    //const [section, setsection] = useState("allSection");




    //const data = getdata.semtopData;
    //var sectionData = getdata.onlysections;
    //const eachsection = getdata["eachSectionTopData"];
    //var data2 = eachsection[section];

    // console.log(getdata);
    // console.log(data);

    // const onPress = (e) =>{
    //     setsection(`${e}`);
    //     data2 = eachsection[section];
    // }

    return (
        <CCard>
    <CCardBody>
        <h5 >
        <text>Backlog Analysis</text>
            
        </h5>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Backlog Subject</th>
                    <th scope="col">Backlog status</th>
                    <th scope="col">Number of attempts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>m1</td>
                        <td>cleared</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>m2</td>
                        <td>cleared</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>m1</td>
                        <td>cleared</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>m2</td>
                        <td>cleared</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>m1</td>
                        <td>cleared</td>
                        <td>2</td>
                    </tr>
                    
                    

                    {/* {data.map((value,index)=>{
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
                    })} */}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                {/* <button type="button" onClick={setsection("allSection")} class="btn btn-primary">ALL</button> */}
                {/* {sectionData.map((value,index) => {
                    return (
                        <button key={index} type="button"  class="btn btn-primary">section-{value}</button>
                    )
                })} */}
            </div>
</CCardBody>
</CCard>

    )
}
 

// const mapStateToProps = state => ({
//     subjSectAnalysisdata: state.auth.subjSectAnalysis
// });


export default Backlog;