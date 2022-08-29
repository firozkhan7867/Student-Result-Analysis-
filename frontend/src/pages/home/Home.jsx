import React, { Fragment } from 'react';
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo';
import "./home.css";
import SecWisePerfamanceChart from '../../components/SecWisePerfamanceChart/SecWisePerfamanceChart';
import { connect } from "react-redux";
import {fetchSemData,fetchRegulationData} from "../../actions/visua"
import Combo from '../../components/chart/Combo';
import { Link } from 'react-router-dom';
import ErrorBoundary from "../error/ErrorBoundary";
const Home = (props) => {

    // const cgpa = () =>{
    //     if (props.semVisData){
    //         if(props.semVisData.CGPA){
    //             return props.semVisData.CGPA
    //         }else{
    //             return {0:0,1:0,2:0,3:0,4:0}
    //         }
    //     }else{
    //         return {0:0,1:0,2:0,3:0,4:0}
    //     }
    // }
    // const back = () =>{
    //     if (props.semVisData){
    //         if(props.semVisData.Back_data){
    //             return props.semVisData.Back_data
    //         }else{
    //             return {0:0,1:0,2:0,3:0,4:0}
    //         }
    //     }else{
    //         return {0:0,1:0,2:0,3:0,4:0}
    //     }
    // }

    // const show = (fdata,cgpa_data,back_data) =>{
    //     if(props.semVisData){
    //         return <Fragment>
    //                 <FeaturedInfo data={fdata}/>
    //                 <Combo cgpa_data={cgpa_data} back_data={back_data}/>
    //                 <br /><br /><br /><br />
    //                 <ErrorBoundary>
    //                     <SecWisePerfamanceChart/>
    //                 </ErrorBoundary>
    //             </Fragment>
    //     }
    //     else{
    //         return <Fragment>
    //                     <div className="container">
    //                         <div className="jumbotron ff">
    //                             <h1 className="display-4">Select The Semester </h1>
    //                             <p className="lead">You are seeing this page because you have not selected  any Semester View the analysis.</p>
    //                             <hr className="my-4" />
    //                             <p>Please Select the Semester from the Sidebar in the left side of this page where you can see Hierarchy ,
    //                                 Select Branch then  select  Regulation then Batch then Semester  .</p>
    //                             <div className="d-flex justify-content-start">
    //                                 <p className="lead mx-5">
    //                                     <Link className="btn btn-primary btn-lg" to="/upload" role="button">Upload New Data</Link>
    //                                 </p>
    //                                 <p className="lead">
    //                                     <Link className="btn btn-info btn-lg" to="/fetch" onClick={props.fetchRegulationData} role="button">Fetch New Data</Link>
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="container">
    //                         <div className="jumbotron text-white ff2">
    //                             <h1 className="display-6">Complete Student Analysis </h1>
    //                             <p className="lead">Here you can see the student Result Analysis for all the semesters</p>
    //                             <hr className="my-4" />
    //                             <p>Please Enter the roll Number of the Student
    //                                 Select Branch then  select  Regulation then Batch then Semester</p>
    //                             <p className="lead">
    //                                 <Link className="btn text-center bb btn-lg"  to="/studentReport"  onClick={props.fetchRegulationData} role="button">Student Report Analysis</Link>
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </Fragment>
    //     }
    // }


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
            {/* {show(props.semVisData,cgpa(),back())} */}
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

