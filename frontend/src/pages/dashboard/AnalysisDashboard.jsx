import React,{useEffect, useState} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import "./dashboard.css";
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys} from "../../actions/visua";
import AnalysisHome from '../home/AnalysisHome';
const AnalysisDashboard = (props) => {
    
    const [sidebar, setsidebar] = useState(true);
    console.log(window.location.href);
    console.log(window.location.pathname);


    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        // props.fetchSemData();
    }, []);
    return (
        <div>
            <Topbar />
            <div className="container-1">

            <Sidebar tog={sidebar}/>
            <AnalysisHome tog={setsidebar} sidebar={sidebar}/>
            {props.children}
            
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapsStateToProps, {checkAuthenticated, load_user, fetchSemData,fetchSubjSectAnalysys })(AnalysisDashboard);

