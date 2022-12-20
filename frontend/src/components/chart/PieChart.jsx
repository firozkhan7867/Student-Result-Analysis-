
import React, { useEffect, useState, useRef } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { CChartPie } from '@coreui/react-chartjs';
import "./featuredinfo.css";
import { Modal, Button } from "react-bootstrap";

const Charts = (props) => {

  const [list, setlist] = useState(false);
  const [data,setdata] = useState({
    bool: false,
    data:[],
    grade: "O",
  })

  const arr_key = () => {
    if (props.cgpa_data) {
      const data = new Map(Object.entries(props.cgpa_data.cgpa));
      return Array.from(data.keys());
    }
    else {
      return [0, 0, 0, 0, 0];
    }
  }



  const arry_val = () => {
    if (props.cgpa_data) {
      const data = new Map(Object.entries(props.cgpa_data.cgpa));
      return Array.from(data.values());
    }

    else {
      return [0, 0, 0, 0, 0];
    }
  }
  

  return (
    <>
    
      <Modal
        show={list}
        onHide={() => setlist(false)}
        dialogClassName="model"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
              Student Details with Grade  - {data.grade} :
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class="mb-3 mx-4">
                <div className="">
                  <table className="table table-hover" style={{ width: "98%" }}>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Roll</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Grade</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.bool ? 
                        data.data.map((value, index2) => {
                          return (
                            <tr>
                              <th scope="row">{index2 + 1}</th>
                              <td>{value.roll}</td>
                              <td>{value.name}</td>
                              <td>{value.grade}</td>
                              <td>{value.result ?
                                <button type='button' className='btn btn-success mx-2' >PASS</button>
                                :
                                <button type='button' className='btn btn-danger mx-2' >FAIL</button>
                              }
                              </td>
                            </tr>
                          )
                        }):""}
                        <tr></tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </Modal.Body>
      </Modal>
      <CCard className="mb-1">
        <CCardHeader>Pie Chart</CCardHeader>
        <CCardBody>
          <CChartPie
            data={{

              labels: arr_key(),

              datasets: [
                {

                  data: arry_val(),
                  backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                  ],
                  hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                  ],
                },
              ],
            }}
            // options={
            //   {
            //     events: {
            //       dataPointSelection: function(event, chartContext, config) {
            //         // console.log(event);
            //         // console.log(chartContext);
            //         console.log(config.dataPointIndex);
            //         // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
            //       }
            //       },
            //   }}
            options={
              {
                onClick: (evt, activeEls) => {
                  // console.log(activeEls[0].index);
                  const data = new Map(Object.entries(props.cgpa_data.cgpa));
                  const keys = Array.from(data.keys());

                  // console.log(keys[activeEls[0].index]);
                  // console.log(props.cgpa_data.list[keys[activeEls[0].index]]);
                  setlist(true);
                  setdata({
                    bool:true,
                    data:props.cgpa_data.list[keys[activeEls[0].index]],
                    grade:keys[activeEls[0].index],
                  })
                },
              }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Charts;