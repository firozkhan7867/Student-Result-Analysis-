import React, { Fragment, useEffect } from 'react';
import "./home.css";
import { connect } from "react-redux";
import SemWiseBacklogAnalysis from '../../components/chart/SemWiseBacklogAnalysis'
import SemWisePerformanceAnalysis from '../../components/chart/SemWisePerformanceAnalysis';
import Grade_all_sem from '../../components/chart/Grade_all_sem';
import Backlog from '../../components/Backlog_analysis/Backlog';
import ErrorBoundary from "../error/ErrorBoundary";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {getStudentDetails, semWiseBacklogData} from "../../actions/visua";
import { Link } from 'react-router-dom';

// import Student from '../forms/Student';
const StudentHome = ({studentdetails,getStudentDetails,tog,sidebar,semWiseBacklogData}) => {

    const [details, setdetails] = useState(studentdetails.details);
    const tt = ()=>{
        tog(!sidebar); 
    }

    useEffect(() => {
      getStudentDetails(localStorage.getItem("studentRoll")).then(() => {
        if (JSON.parse(localStorage.getItem("studentdetails")).roll !== null || studentdetails.roll === null){
            setdetails(JSON.parse(localStorage.getItem("studentdetails")).details)
            semWiseBacklogData(localStorage.getItem("studentRoll"))
        }
        })
    }, [])
    

    const ok = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
    const sutdentProfile= `http://123.108.200.174/img/photos/${studentdetails.roll}.JPG`;

    return (
        <div className='home  main-container'>
            <div className="mx-3 my-3 d-flex justify-content-between">
                <div className="" onClick={tt}>
                    <button   class="navbar-toggler navbar-light bg-light px-2 py-1 rounded" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button> <span className='fw-light text-secondary mx-2'>Toggle Side bar</span>
                </div>
                <div className="mx-3 ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Student Analysis</li>
                    </ol>
                </div>
            </div>
            <Fragment>
                <div className="ss h-100">


                    <div className=" py-2">

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        <img src={sutdentProfile} alt="avatar"
                                            onError={(e) => (e.target.onerror = null, e.target.src = ok)}
                                            className="rounded-circle img-fluid" width={150} />

                                        <h5 className="my-3">{details.name}</h5>
                                        <p className="text-muted mb-1">B Tech</p>
                                        <p className="text-muted mb-1">{details.branch}, Section - {details.section}</p>

                                        <p className="text-muted mb-4">{details.roll}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card p-4 h-100">
                                    <div className="card-body">
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.name}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.email}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.mobile}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">DOB</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.dob}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Father Name </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.father}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Aadhar</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{details.aadhar}</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='component-cards my-4'>
                        <Row>
                            <Col>
                                <div className="component">
                                    <ErrorBoundary >
                                        <SemWiseBacklogAnalysis />
                                    </ErrorBoundary>
                                </div>
                            </Col>
                            <Col>
                                <div className="component">
                                    <ErrorBoundary>
                                        <SemWisePerformanceAnalysis />
                                    </ErrorBoundary>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <Row>
                            <Col>
                                <div className="component">
                                    <ErrorBoundary>
                                        <Grade_all_sem />
                                    </ErrorBoundary>
                                </div>

                            </Col>
                            <Col>
                                <div className="component">
                                    <ErrorBoundary>
                                        <Backlog />
                                    </ErrorBoundary>
                                </div>

                            </Col>
                        </Row>



                    </div>
                </div>

            </Fragment>
        </div>
    );
}

const mapStateToProps = state => ({
    studentdetails: state.auth.studentdetails
});


export default connect(mapStateToProps,{getStudentDetails,semWiseBacklogData})(StudentHome);

// export default StudentHome;

