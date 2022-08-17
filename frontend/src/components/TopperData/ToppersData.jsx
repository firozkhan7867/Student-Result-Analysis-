import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";



import btns from "./semsbtn.json"
const  ToppersData = ({}) => {
    const getdata = JSON.parse(localStorage.getItem("subjSectAnalysis"));

    const data = getdata.semtopData;
    const sectionData = getdata.onlysections;
    // console.log(sectionData);
    // console.log(getdata);
    // console.log(data);

    return (
        <div className=''>
            <table class="table table-hover">
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

                    {data.map((value,index)=>{
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
                {sectionData.map((value,index) => {
                    return (
                        <button key={index} type="button" class="btn btn-primary">section-{value}</button>
                    )
                })}
            </div>
        </div>
    )
}
 

export default ToppersData;