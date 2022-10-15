
import React,{useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../home/Home";
import { connect } from "react-redux";
import "./dashboard.css";
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys,fetchRegulationData,postRegulationData,postFetchData} from "../../actions/visua";
import FetchMainPage from '../home/FetchMainPage';
// import Navbar from '../../components/navbar/Navbar';
// import DashboardNav from '../../components/navbar/DashboardNav';
const FetchDataDashboard = (props) => {

    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        // props.fetchRegulationData();
        // props.fetchSemData();
    }, []);

    // console.log(props.RegulationData);   
    return (
        <div>
            <Topbar />
            <div className="container-1">
                <Sidebar/>
                {/* <Home/> */}
                <FetchMainPage regData={props.RegulationData} fetchRegulationData={props.fetchRegulationData} 
                                postRegulationData={props.postRegulationData} checkFetchSem={props.checkFetchSem}
                                postFetchData={props.postFetchData} 
                                />
                                
                {props.children}
                
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    RegulationData: state.auth.RegulationData,
    checkFetchSem: state.auth.checkFetchSem,
})
export default connect(mapsStateToProps, {checkAuthenticated, load_user, fetchSemData,fetchSubjSectAnalysys,fetchRegulationData,postRegulationData,postFetchData })(FetchDataDashboard);

