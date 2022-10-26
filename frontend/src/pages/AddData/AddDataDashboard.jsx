
import React,{useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../home/Home";
import { connect } from "react-redux";
import "./dashboard.css";
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys,fetchRegulationData,postRegulationData,postFetchData} from "../../actions/visua";
import FetchMainPage from '../home/FetchMainPage';
import AddDataMainPage from './AddDataMainPage';
// import Navbar from '../../components/navbar/Navbar';
// import DashboardNav from '../../components/navbar/DashboardNav';
const AddDataDashboard = ({checkAuthenticated,load_user}) => {

    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div>
            <Topbar />
            <div className="container-1">
                <Sidebar/>
                {/* <Home/> */}
                <AddDataMainPage  />
                                
                
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    RegulationData: state.auth.RegulationData,
})
export default connect(mapsStateToProps, {checkAuthenticated,load_user})(AddDataDashboard);

