import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { connect } from 'react-redux';

import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import "./Backlog.css";


const Backlog = ({ studentdetails }) => {
    // console.log(studentdetails);
    const details = () => {
        if (studentdetails.roll !== null) {
            if (studentdetails.backlog) {
                return studentdetails.backlog.map((value, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{value.name}</td>
                            <td>
                                {value.passed === true ? <div className="btn-sm btn-success text-center">Cleared</div>  : <div className="btn-sm btn-danger text-center">Failed</div>}
                            </td>
                            <td>{value.count}</td>
                        </tr>
                    )
                })
            } else {
                return (
                    <tr>
                        <td>1</td>
                        <td>None</td>
                        <td>None</td>
                        <td>None</td>
                    </tr>
                )
            }
        }
        else {
            return (
                <tr>
                    <td>1</td>
                    <td>None</td>
                    <td>None</td>
                    <td>None</td>
                </tr>
            )
        }
    }
    return (
        <CCard>
            <h5 >
                <p>Backlog Analysis</p>

            </h5>
            <div className="h">
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Backlog Subject</th>
                            <th scope="col">Backlog status</th>
                            <th scope="col">Number of attempts</th>
                        </tr>
                    </thead>
                    <tbody className='h'>
                        {details()}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-between">

            </div>
        </CCard>

    )
}


const mapStateToProps = state => ({
    studentdetails: state.auth.studentdetails
});
export default connect(mapStateToProps, {})(Backlog);