import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../../actions/auth';
import { getAllAdminData,fetchdata1 } from '../../actions/visua';
import Sidebar from '../../components/sidebar/Sidebar';
import StudentSideBar from '../../components/sidebar/StudentSideBar';
import Topbar from '../../components/topbar/Topbar';
import AddBatch from '../AddData/AddBatch';
import AddBranch from '../AddData/AddBranch';
import AddDataMainPage from '../AddData/AddDataMainPage';
import AddReg from '../AddData/AddReg';
import EditBatch from '../AddData/EditBatch';
import EditBranch from '../AddData/EditBranch';
import EditReg from '../AddData/EditReg';
import EditSem from '../AddData/EditSem';

const AdminDashboard = ({isAuthenticated,checkAuthenticated,load_user,getAllAdminData}) => {
 

    useEffect(() => {
        checkAuthenticated();
        load_user();
        getAllAdminData();
    }, []);

    const [page,setPage] = useState("addBranch");

    const pages = {"addBranch":<AddBranch/>,"addBatch":<AddBatch/>,"addReg":<AddReg/>,"editBranch":<EditBranch/>,"editReg":<EditReg/>,"editBatch":<EditBatch/>,"editSem":<EditSem/>}
    
    const [sidebar, setsidebar] = useState(true);

  return (
    <div>
        <Topbar />
        <div className="container-1">
            <StudentSideBar tog={sidebar} selected={setPage} fetchdata1={fetchdata1}/>
            {/* <Home/> */}
            <AddDataMainPage   tog={setsidebar} sidebar={sidebar} pagestoShow={pages[page]} pp={page} />
                            
            
        </div>

    </div>
  )
}

const mapsStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})


export default connect(mapsStateToProps,{checkAuthenticated,load_user,getAllAdminData})(AdminDashboard);