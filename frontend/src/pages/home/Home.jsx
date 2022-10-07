import React, { Fragment } from 'react';
import "./home.css";
import { connect } from "react-redux";
import {fetchSemData,fetchRegulationData} from "../../actions/visua"
import { Link } from 'react-router-dom';
import ErrorBoundary from "../error/ErrorBoundary";
const Home = (props) => {

    return ( 
        <div className='home'>
            <ErrorBoundary>
                <Fragment>
                        <div className="container">
                            <div className="jumbotron ff">
                                <h1 className="display-4">Select The Semester </h1>
                                <p className="lead">You are seeing this page because you have not selected  any Semester View the analysis.</p>
                                <hr className="my-4" />
                                <p>Please Select the Semester from the Sidebar in the left side of this page where you can see Hierarchy ,
                                    Select Branch then  select  Regulation then Batch then Semester  .</p>
                                <div className="d-flex justify-content-start">
                                    <p className="lead mx-5">
                                        <Link className="btn btn-primary btn-lg" to="/upload" role="button">Upload New Data</Link>
                                    </p>
                                    <p className="lead">
                                        <Link className="btn btn-info btn-lg" to="/fetch" onClick={props.fetchRegulationData} role="button">Fetch New Data</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="jumbotron text-white ff2">
                                <h1 className="display-6">Complete Student Analysis </h1>
                                <p className="lead">Here you can see the student Result Analysis for all the semesters</p>
                                <hr className="my-4" />
                                <p>Please Enter the roll Number of the Student
                                    Select Branch then  select  Regulation then Batch then Semester</p>
                                <p className="lead">
                                    <Link className="btn text-center bb btn-lg"  to="/studentReport"  onClick={props.fetchRegulationData} role="button">Student Report Analysis</Link>
                                </p>
                            </div>
                        </div>
                </Fragment>
            </ErrorBoundary>
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

export default connect(mapStateToProps, { fetchSemData,fetchRegulationData })(Home);

