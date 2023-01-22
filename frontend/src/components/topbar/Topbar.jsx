import React, { useEffect } from 'react';
import "./topbar.css";
// import { Language, NotificationsNone, Settings } from '@material-ui/icons';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { checkAuthenticated } from '../../actions/auth';


const Topbar = ({ logout, isAuthenticated, checkAuthenticated }) => {


    useEffect(() => {
        checkAuthenticated();
    }, []);

    if (isAuthenticated === false) {
        // const nav= useNavigate();
        // return nav("/login");
        return <Navigate to="/login" />
    }
    return (
        <div className="topbar">
            {/* <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">
                        Student Result Analysis
                    </span>
                </div>
                <div className="topRight">

                    <Link className="tt topbarIconsContainer2" to="/" >Home</Link>

                    <Link className="tt topbarIconsContainer2" to="/backdata" >Upload Supply Result</Link>

                    <Link className="tt topbarIconsContainer2" to="/upload" >Upload New Sem Result</Link>

                    <Link className="tt topbarIconsContainer2" to="/student">Student Upload</Link>

                    <Link className="tt topbarIconsContainer1" to="#!" onClick={logout}>Logout</Link>

                    <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="" className='topAvatar' />
                </div>
            </div> */}

            <nav class="navbar navbar-expand-lg position-sticky">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"> <span className="logo">
                        Student Result Analysis
                    </span></a>
                    <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <form class="d-flex">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <Link className="tt topbarIconsContainer2 btn btn-outline-primary" to="/" >Home</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="tt topbarIconsContainer2 btn btn-outline-primary" to="/backdata" >Upload Supply Result</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="tt topbarIconsContainer2 btn btn-outline-primary" to="/upload" >Upload New Sem Result</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="tt topbarIconsContainer2 btn btn-outline-success" to="/student">Student Upload</Link>
                                </li>
                                <li class="nav-item">
                                    <Link className="tt topbarIconsContainer1 btn btn-outline-danger" to="#!" onClick={logout}>Logout</Link>
                                </li> 
                                <Link to="/admin/web"><img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="" className='topAvatar' /></Link>
                            </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}



const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapsStateToProps, { logout, checkAuthenticated })(Topbar);
