import React, { useState } from 'react';
import "./StudentSideBar.css"; 


const StudentSideBar = ({selected,tog}) =>{
    const [first, setfirst] = useState({batch:[]});


        return (
            <div className={tog ? 'sidebar1' : "sidebar1 d-none" }> 
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">

                        <div className="nav-item nn" onClick={() => selected("addBranch")}>
                            Add Branch
                        </div>
                        <div className="nav-item nn" onClick={() => selected("editBranch")}>
                            Edit Branch
                        </div>
                        <div className="nav-item nn"  onClick={() => selected("addReg")}>
                            Add Regulation
                        </div>
                        <div className="nav-item nn"  onClick={() => selected("editReg")}>
                            Edit Regulation
                        </div>
                        <div className="nav-item nn"  onClick={() => selected("addBatch")}>
                            Add Batch 
                        </div>
                        <div className="nav-item nn"  onClick={() => selected("editBatch")}>
                            Edit Batch 
                        </div>
                    </div>
                </div>
            </div>
        );
}
    

export default StudentSideBar