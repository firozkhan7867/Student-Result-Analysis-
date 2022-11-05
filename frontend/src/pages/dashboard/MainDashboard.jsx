import React,{useEffect, useState} from 'react';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../home/Home";
import { connect } from "react-redux";
import "./dashboard.css";
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys} from "../../actions/visua";
import AnalysisHome from '../home/AnalysisHome';
import { checkAuthenticated, load_user } from "../../actions/auth";
import {fetchSemData,fetchSubjSectAnalysys,fetchRegulationData,postRegulationData,postFetchData,fetchSemData,fetchSubjSectAnalysys} from "../../actions/visua";
import FilterMainPage from '../home/FilterMainPage';
import StudentMainPage from '../home/StudentMainPage';
// import Navbar from '../../components/navbar/Navbar';
// import DashboardNav from '../../components/navbar/DashboardNav';
const MainDashboard = (props) => {

    const [sidebar, setsidebar] = useState(true);


    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
        // props.fetchSemData();
    }, []);


    const main = () =>{
        if(window.location.pathname === "/"){
            return <Home tog={setsidebar} sidebar={sidebar} />
        }
        else if(window.location.pathname === "/analysis"){
            return <AnalysisHome tog={setsidebar} sidebar={sidebar}/>
        }
        else if(window.location.pathname === "/fetch"){
            return <FetchMainPage regData={props.RegulationData} fetchRegulationData={props.fetchRegulationData} 
                        postRegulationData={props.postRegulationData} checkFetchSem={props.checkFetchSem}
                        postFetchData={props.postFetchData} 
                    />
        }
        else if(window.location.pathname === "/filter"){
            return <FilterMainPage  />
        }
        else if(window.location.pathname === "/studentReport"){
            return <StudentMainPage />
        }
        else if(window.location.pathname === "/studentReport/:roll"){
            
        }
    }


    return (
        <div>
            <Topbar />
            <div className="container-1">

            <Sidebar tog={sidebar}/>
            <Home tog={setsidebar} sidebar={sidebar} />
            {/* {props.children} */}
            
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    RegulationData: state.auth.RegulationData,
    checkFetchSem: state.auth.checkFetchSem,
})


export default connect(mapsStateToProps, {checkAuthenticated, load_user, fetchSemData,fetchSubjSectAnalysys,fetchRegulationData,postRegulationData,postFetchData  })(MainDashboard);


