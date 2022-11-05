import React, { Fragment } from 'react';
import "./home.css";
import { connect } from "react-redux";
import { fetchSemData, fetchRegulationData, fetchdata1 } from "../../actions/visua"
import { Link } from 'react-router-dom';
import ErrorBoundary from "../error/ErrorBoundary";
// import Sidebar from '../../components/sidebar/Sidebar';
const Home = (props) => {

    const tt = ()=>{
        props.tog(!props.sidebar); 
    }



    return (
        <div className='home main-container'>
            <div className="mx-3 my-3 d-flex justify-content-between">
                <div className="" onClick={tt}>
                    <button   class="navbar-toggler navbar-light bg-light px-2 py-1 rounded" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button> <span className='fw-light text-secondary mx-2'>Toggle Side bar</span>
                </div>
                <div className="mx-3 ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </div>
            </div>
            <ErrorBoundary>
                <Fragment>
                    <div className="">
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
                                    <p className="lead mx-5">
                                        <Link className="btn btn-secondary btn-lg" to="/filter" onClick={props.fetchdata1} role="button">Filter and Generate Data</Link>
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
                                <div className="d-flex">
                                    <p className="lead">
                                        <Link className="btn text-center bb btn-lg" to="/studentReport" onClick={props.fetchRegulationData} role="button">Student Report Analysis</Link>
                                    </p>
                                    <p className="lead mx-4">
                                        <Link className="btn btn-danger  btn-lg" to="/addData" role="button">Add Data</Link>
                                    </p>
                                </div>
                            </div>
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

export default connect(mapStateToProps, { fetchSemData, fetchRegulationData, fetchdata1 })(Home);

