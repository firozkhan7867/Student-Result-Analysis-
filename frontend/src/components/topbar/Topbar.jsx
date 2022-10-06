import React,{useEffect} from 'react';
import "./topbar.css";
// import { Language, NotificationsNone, Settings } from '@material-ui/icons';
import {connect} from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import {logout} from '../../actions/auth';
import { checkAuthenticated } from '../../actions/auth';


const Topbar = ({ logout, isAuthenticated ,checkAuthenticated }) => {


    useEffect(() => {
        checkAuthenticated();
    }, []);

    if (isAuthenticated === false){
        // const nav= useNavigate();
        // return nav("/login");
        return <Navigate to="/login" />
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                       Student Result Analysis
                    </span>
                </div>
                <div className="topRight">
                    {/* <div className="topbarIconsContainer">
                         <NotificationsNone/>
                         <span className="topIconBadge">
                             2
                         </span>
                    </div>
                    <div className="topbarIconsContainer">
                         <Language/>
                         <span className="topIconBadge">
                             2
                         </span>
                    </div>
                    <div className="topbarIconsContainer">
                         <Settings/>
                         <span className="topIconBadge">
                             2
                         </span>
                    </div> */}
                    <div className="">
                        <Link className="tt topbarIconsContainer2" to="/" >Home</Link>
                    </div>
                    <div className="">
                        <Link className="tt topbarIconsContainer2" to="/backdata" >Upload Supply Result</Link>
                    </div>
                    <div className="">
                        <Link className="tt topbarIconsContainer2" to="/upload" >Upload New Sem Result</Link>
                    </div>
                    <div className="">
                    <Link className="tt topbarIconsContainer2" to="/student">Student Upload</Link>
                    </div>
                    <div className="">
                    <Link className="tt topbarIconsContainer1" to="#!" onClick={logout}>Logout</Link>
                    </div>
                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
                         alt="" className='topAvatar' />
                </div>
            </div>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapsStateToProps , { logout,checkAuthenticated })(Topbar);
