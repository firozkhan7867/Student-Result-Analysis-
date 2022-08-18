import React,{useEffect} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../home/Home";
import { connect } from "react-redux";
import "./dashboard.css";
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys} from "../../actions/visua";
import StudentHome from '../home/StudentHome';
// import Navbar from '../../components/navbar/Navbar';
// import DashboardNav from '../../components/navbar/DashboardNav';
const StudentReportDashboard = (props) => {

    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        // props.fetchSemData();
    }, []);
    return (
        <div>
            <Topbar />
            <div className="container-1">
                <Sidebar/>
                {/* <Home/> */}
                <StudentHome />
                {props.children}
                
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapsStateToProps, {checkAuthenticated, load_user, fetchSemData,fetchSubjSectAnalysys })(StudentReportDashboard);

