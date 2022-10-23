import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { connect } from 'react-redux';

import { CCard, CCardBody, CCardHeader} from '@coreui/react';
import "./Backlog.css";


const  Backlog = () => {
    return (
        <CCard>
        <h5 >
        <p>Backlog Analysis</p>
            
        </h5>
            <table className="table table-hover">
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
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                
            </div>
</CCard>

    )
}


export default Backlog;