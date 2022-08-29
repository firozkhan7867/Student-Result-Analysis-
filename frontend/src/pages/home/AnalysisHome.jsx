import React, { Fragment } from 'react';
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo';
import "./home.css";
import SecWisePerfamanceChart from '../../components/SecWisePerfamanceChart/SecWisePerfamanceChart';
import { connect } from "react-redux";
import {fetchSemData,fetchRegulationData} from "../../actions/visua"
import Combo from '../../components/chart/Combo';
// import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
const AnalysisHome = (props) => {
    let history = useHistory();


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
            history.push("/");

            return <Fragment>
                        <div className="container">
                            Couldn't Fetch Data Some thing Went Wrong ... !!
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
    semVisData: state.auth.semVisData
});

export default connect(mapStateToProps, { fetchSemData,fetchRegulationData })(AnalysisHome);

