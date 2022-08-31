import React, { Fragment } from 'react';
import "./home.css";
// import { connect } from "react-redux";
import SemWiseBacklogAnalysis from '../../components/chart/SemWiseBacklogAnalysis'
import SemWisePerformanceAnalysis from '../../components/chart/SemWisePerformanceAnalysis';
import Grade_all_sem from '../../components/chart/Grade_all_sem';
import Backlog from '../../components/Backlog_analysis/Backlog';
import ErrorBoundary from "../error/ErrorBoundary";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Student from '../forms/Student';
const StudentHome = () => {

    const img = (roll) => {

    }



    return (
        <div className='home'>
            <Fragment>
                <div className="ss h-100">


                    <div className=" py-2">

                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body text-center">
                                        {/* <img src="http://123.108.200.174/img/photos/19131A05P1.JPG" alt="avatar" */}
                                        
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        
                                            className="rounded-circle img-fluid" width={150} />
                                        <h5 className="my-3">John Smith</h5>
                                        <p className="text-muted mb-1">B Tech</p>
                                        <p className="text-muted mb-1">CSE, Section - 1</p>

                                        <p className="text-muted mb-4">Roll Number</p>
                                        <div className="d-flex justify-content-center mb-2">
                                            {/* <button type="button" class="btn btn-primary">Follow</button>
                                        <button type="button" class="btn btn-outline-primary ms-1">Message</button> */}
                                        </div>
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
                                                <p className="text-muted mb-0">Johnatan Smith</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">example@example.com</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">(097) 234-5678</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">DOB</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">12-12-2002</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Father Name </p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">NAME kuand</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Aadhar</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">***********</p>
                                            </div>
                                        </div>
                                        <hr width={600} />
                                        <div className="row my-3">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Address</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">***********</p>
                                            </div>
                                        </div>
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

// const mapStateToProps = state => ({
//     semVisData: state.auth.semVisData
// });

// export default connect(mapStateToProps,null)(StudentHome);

export default StudentHome;

