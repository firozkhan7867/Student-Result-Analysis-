import React from 'react'
// import "./widgetlg.css"
//import Button from 'react-bootstrap/Button';
import { useState } from "react";
import Modal from "../../components/model/Model";



import btns from "./semsbtn.json"
export default function WidgetLg() {
    const s=btns.data;
    return (
        <div className=''>
            <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">CGPA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>9.7</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>9.5</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>9.5</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
 