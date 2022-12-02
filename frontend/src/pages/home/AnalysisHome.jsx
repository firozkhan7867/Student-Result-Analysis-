import React, { Fragment, useState } from 'react';
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo';
import "./home.css";
import SecWisePerfamanceChart from '../../components/SecWisePerfamanceChart/SecWisePerfamanceChart';
import { connect } from "react-redux";
import {fetchSemData,fetchRegulationData} from "../../actions/visua"
import Combo from '../../components/chart/Combo';
// import { Link } from 'react-router-dom';
import { Link, Navigate, useNavigate } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import { FcDownload } from 'react-icons/fc';




const AnalysisHome = (props) => {
    let history = useNavigate();

    const tt = ()=>{
        props.tog(!props.sidebar);
        setfirst(!first);
    }


    const [first, setfirst] = useState(true);

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
                    <Combo cgpa_data={cgpa_data} back_data={back_data}/>
                    <br /><br /><br /><br />
                    <ErrorBoundary>
                        <SecWisePerfamanceChart/>
                    </ErrorBoundary>
                </Fragment>
        }
        else{
            // history.push("/");
            // <Navigate to="/"/>  
            history("/");

            return <Fragment>
                        <ErrorBoundary>
                            <div className="container">
                                Couldn't Fetch Data Some thing Went Wrong ... !!
                            </div>
                        </ErrorBoundary>
                    </Fragment>
        }
    }

    const bread = () =>{
        if (props.semDetails){
            return <Fragment>
                        <li class="breadcrumb-item">{props.semDetails.branch}</li>
                        <li class="breadcrumb-item">{props.semDetails.reg}</li>
                        <li class="breadcrumb-item">{props.semDetails.batch}</li>
                        <li class="breadcrumb-item active" aria-current="page">{props.semDetails.name} Semester Analysis</li>
                    </Fragment>
        }
    }

    const print = ()=>{
        window.print()
    }

    return ( 
        <div className={first ? 'home' : 'home2'}>
            <div className="mx-3 my-3 d-flex justify-content-between">
                <div className="">
                    <button onClick={tt} class="navbar-toggler navbar-light bg-light px-2 py-1 rounded" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button> <span className='fw-light text-secondary mx-2'>Toggle Side bar</span>
                </div>
                {/* <p onClick={print} className="px-2 py-2  border" >download </p> */}

                <p onClick={print} class="btn btn-outline-dark" data-bs-toggle="tooltip" data-bs-placement="top" title="Select Layout as LandScape"><FcDownload/> Download </p>
                <div className="mx-3 ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        {bread()}
                    </ol>
                </div>
            </div>
            {/* <FeaturedInfo data={props.semVisData}/>
            <Combo cgpa_data={cgpa()} back_data={back()} /> */}
            {/* <Combo */}
            {/* <Chart data={userData} title="User Analytics" grid datakey="Active User" /> */}
            {/* <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg /> 
            </div> */}
            <ErrorBoundary>
                {show(props.semVisData,cgpa(),back())}
            </ErrorBoundary>
            {/* <div className="container-fluid d-flex justify-content-center mt-5">
                hi
            </div> */}

            {/* {show()} */}

        </div>
    );
}

const mapStateToProps = state => ({
    semVisData: state.auth.semVisData,
    semDetails:state.auth.semDetails
});

export default connect(mapStateToProps, { fetchSemData,fetchRegulationData })(AnalysisHome);

