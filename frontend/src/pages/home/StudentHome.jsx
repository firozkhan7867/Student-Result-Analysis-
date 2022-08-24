import React, { Fragment } from 'react';
// import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo';
import "./home.css";
// import WidgetSm from '../../components/widgetSm/WidgetSm';
import SecWisePerfamanceChart from '../../components/SecWisePerfamanceChart/SecWisePerfamanceChart';
// import WidgetLg from '../../components/widgetLg/WidgetLg';
import { connect } from "react-redux";
import {fetchSemData} from "../../actions/visua"
import Combo from '../../components/chart/Combo';
import { Link } from 'react-router-dom';
import SemWiseBacklogAnalysis from '../../components/chart/SemWiseBacklogAnalysis'
import SemWisePerformanceAnalysis from '../../components/chart/SemWisePerformanceAnalysis';
import Grade_all_sem from '../../components/chart/Grade_all_sem';
import Backlog from '../../components/Backlog_analysis/Backlog';
// import PieChartSecWiseFail from '../../components/chart/PieChartSecWiseFail'
import ErrorBoundary from "../error/ErrorBoundary";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Student from '../forms/Student';
const StudentHome = (props) => {

    const cgpa = () =>{
        if (props.semVisData){
            if(props.semVisData.CGPA){
                return props.semVisData.CGPA
            }else{
                return {0:0,1:0,2:0,3:0,4:0}
            }
        }else{
            return {0:0,1:0,2:0,3:0,4:0}
        }
    }
    const back = () =>{
        if (props.semVisData){
            if(props.semVisData.Back_data){
                return props.semVisData.Back_data
            }else{
                return {0:0,1:0,2:0,3:0,4:0}
            }
        }else{
            return {0:0,1:0,2:0,3:0,4:0}
        }
    }

    const show = (fdata,cgpa_data,back_data) =>{
        if(props.semVisData){
            return <Fragment>

                    <FeaturedInfo data={fdata}/>
                    {/* <Combo cgpa_data={cgpa_data} back_data={back_data} /> */}
                    {/* <Combo */}
                    {/* <Chart data={userData} title="User Analytics" grid datakey="Active User" /> */}
                    {/* <div className="homeWidgets">
                        <WidgetLg  /> 
                    </div>
                    <SecWisePerfamanceChart/>
                    <div className='PieChartSecWiseFail'>
                    <PieChartSecWiseFail/>
                    </div> */}
                    <br /><br /><br /><br />
                    <h1>hi</h1>

                    {/* <ErrorBoundary>
                        <SecWisePerfamanceChart/>
                    </ErrorBoundary> */}
                </Fragment>
        }
        else{
            return <Fragment>
                        <div className="ss h-100">
                            {/* <div class=" mt-2 w-100">
                                <div class="row d-flex justify-content-center">
                                    <div class="cen d-flex justify-content-center">
                                        <div class="card p-2 text-center">
                                            <div class="row">
                                                <div class="col-md-7 border-right no-gutters">
                                                    <div class="py-3"><img src="https://i.imgur.com/hczKIze.jpg" width="100" class="rounded-circle"/>
                                                        <h4 class="text-secondary">John Smith</h4>
                                                        <div class="allergy"><span>Allergy</span></div>
                                                        <div class="stats">
                                                            <table class="table table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div class="d-flex flex-column"> <span class="text-left head">DOB</span> <span class="text-left bottom">03/13/2016</span> </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="d-flex flex-column"> <span class="text-left head">Age</span> <span class="text-left bottom">22Y 4m</span> </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div class="d-flex flex-column"> <span class="text-left head">Weight</span> <span class="text-left bottom">168 lb</span> </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="d-flex flex-column"> <span class="text-left head">Height</span> <span class="text-left bottom">5'9"</span> </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div class="px-3"><button type="button" class="btn btn-primary btn-block">Send Message</button></div>
                                                    </div>
                                                </div>
                                                <div class="col-md-5">
                                                    <div class="py-3">
                                                        <div> <span class="d-block head">Home Address</span> <span class="bottom">123 Broadway,New York,NY,10012</span> </div>
                                                        <div class="mt-4"> <span class="d-block head">Mobile Phone#</span> <span class="bottom">917 (543)-1234</span> </div>
                                                        <div class="mt-4"> <span class="d-block head">Home Phone#</span> <span class="bottom">212 (213)-1234</span> </div>
                                                        <div class="mt-4"> <span class="d-block head">Work Phone#</span> <span class="bottom">718 (702)-9876</span> </div>
                                                        <div class="mt-4"> <span class="d-block head">Email</span> <span class="bottom">j.smith@gmail.com</span> </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div class=" py-2">

                                <div class="row">
                                <div class="col-lg-4">
                                    <div class="card mb-4">
                                    <div class="card-body text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        class="rounded-circle img-fluid" width={150}/>
                                        <h5 class="my-3">John Smith</h5>
                                        <p class="text-muted mb-1">B Tech</p>
                                        <p class="text-muted mb-1">CSE</p>

                                        <p class="text-muted mb-4">Roll Number</p>
                                        <div class="d-flex justify-content-center mb-2">
                                        {/* <button type="button" class="btn btn-primary">Follow</button>
                                        <button type="button" class="btn btn-outline-primary ms-1">Message</button> */}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="card mb-4 p-4">
                                    <div class="card-body">
                                        <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Full Name</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">Johnatan Smith</p>
                                        </div>
                                        </div>
                                        <hr width={600} />
                                        <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">example@example.com</p>
                                        </div>
                                        </div>
                                        <hr width={600} />
                                        <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Phone</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">(097) 234-5678</p>
                                        </div>
                                        </div>
                                        <hr width={600}/>
                                        <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">DOB</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">12-12-2002</p>
                                        </div>
                                        </div>
                                        <hr width={600}/>
                                        <div class="row">
                                        <div class="col-sm-3">
                                            <p class="mb-0">Aadhar</p>
                                        </div>
                                        <div class="col-sm-9">
                                            <p class="text-muted mb-0">***********</p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            
                    <div className='component-cards'>
                        <Row>
                            <Col>
                                <div className="component">
                                <ErrorBoundary >
                                    <SemWiseBacklogAnalysis/>

                                </ErrorBoundary>
                                </div>
                            </Col>
                            <Col>
                                <div className="component">
                                <ErrorBoundary>
                                    <SemWisePerformanceAnalysis/>
                                </ErrorBoundary>
                                </div>
                            </Col>
                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col>
                                <div className="component">
                                <ErrorBoundary>
                                    <Grade_all_sem/>
                                </ErrorBoundary>
                                </div>

                            </Col>
                            <Col>
                                <div className="component">
                                <ErrorBoundary>
                                    <Backlog/>
                                </ErrorBoundary>
                                </div>

                            </Col>
                        </Row>
                        
                        
                        
                    </div>
                    </div>
                        
                    </Fragment>
        }
    }


    return ( 
        <div className='home'>
            {/* <FeaturedInfo data={props.semVisData}/>
            <Combo cgpa_data={cgpa()} back_data={back()} /> */}
            {/* <Combo */}
            {/* <Chart data={userData} title="User Analytics" grid datakey="Active User" /> */}
            {/* <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg /> 
            </div> */}
            {show(props.semVisData,cgpa(),back())}
            {/* <div className="container-fluid d-flex justify-content-center mt-5">
                hi
            </div> */}

            {/* {show()} */}

            
            
        </div>
    );
}

const mapStateToProps = state => ({
    semVisData: state.auth.semVisData
});

export default connect(mapStateToProps, { fetchSemData })(StudentHome);

