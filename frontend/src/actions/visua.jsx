import {
    FETCH_VIS_DATA_SUCCESS,
    FETCH_VIS_DATA_FAIL,
    FETCH_SUBJ_DATA_SUCCESS,
    FETCH_SUBJ_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_SUCCESS,
    FETCH_REGULATION_DATA_SUCCESS,
    FETCH_REGULATION_DATA_FAIL,
    GET_SEM_WISE_BACKLOG_ANALYSIS_SUCCESS,
    GET_SEM_WISE_BACKLOG_ANALYSIS_FAIL,
    CHECK_FETCH_DATA_SUCCESS,
    CHECK_FETCH_DATA_FAIL,
    CHECK_STUDENT_ROLL_SUCCESS,
    CHECK_STUDENT_ROLL_FAIL,
    GET_STUDENT_DETAILS_SUCCESS,
    GET_STUDENT_DETAILS_FAIL,
    SAVEID,
    GET_FETCH_DATA_1_SUCCESS,
    GET_FETCH_DATA_1_FAIL,
    GET_FETCH_DATA_2_SUCCESS,
    GET_FETCH_DATA_2_FAIL,
    GET_FETCH_DATA_3_FAIL,
    GET_FETCH_DATA_3_SUCCESS,
    POST_FILTER_DATA_FAIL,
    POST_FILTER_DATA_SUCCESS,
    POST_ADD_REG_SUCCESS,
    POST_ADD_REG_FAIL,
    POST_ADD_BRANCH_FAIL,
    POST_ADD_BRANCH_SUCCESS,
    POST_ADD_BATCH_FAIL,
    POST_ADD_BATCH_SUCCESS,
    GET_ALL_ADMIN_DATA_FAIL,
    GET_ALL_ADMIN_DATA_SUCCESS,
    POST_DELETE_BRANCH_FAIL,
    POST_DELETE_BRANCH_SUCCESS,
    POST_EDIT_BRANCH_FAIL,
    POST_EDIT_BRANCH_SUCCESS,
} from "./types";
import axios from "axios";

export const fetchSemData = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/subj/${id}`,config)
        dispatch({
            type: FETCH_VIS_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_VIS_DATA_FAIL,
        })
    }

}

export const fetchSubjData = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/student/${id}`,config)
        dispatch({
            type: FETCH_SUBJ_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_SUBJ_DATA_FAIL,
        })
    }

}


export const fetchSubjSectAnalysys = (id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_subj_section_data/${id}`,config)
        //console.log(res.data);
        dispatch({
            type: FETCH_SUBJ_SECT_DATA_SUCCESS,
            payload: res.data,
        })

        dispatch({
            type: SAVEID,
            payload: id,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_SUBJ_SECT_DATA_FAIL,
        })
    }
}


export const fetchRegulationData = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_fetch_data`,config)
        // console.log(res.data);
        dispatch({
            type: FETCH_REGULATION_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: FETCH_REGULATION_DATA_FAIL,
        })
    }
}



export const postRegulationData = (branch,batch,sem) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const batchs = parseInt(batch);
    const sems = parseInt(sem);
    // console.log("inside");

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/check_sem_data_exists/${batchs}/${sems}/${branch}`,config)
        // console.log(res.data);
        dispatch({
            type: CHECK_FETCH_DATA_SUCCESS,
            payload: res.data,
        })

        return res;
        
    }catch(err){

        dispatch({
            type: CHECK_FETCH_DATA_FAIL,
        })
        
    }

    return {"code":"warning","msg":"something went wrong and could not fetch...."}
    
}





export const postFetchData = (branch,batch,sem) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const batchs = parseInt(batch);
    const sems = parseInt(sem);
    // console.log("inside");

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetch_semester_result/${batchs}/${sems}/${branch}`,config)
        // console.log(res.data);
        console.log(res);
        

    }catch(err){

        console.log(err);
        
    }

}






// export const checkStudentDetails = (roll) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/check_student_exists/${roll}`,config)
//         // console.log(res.data);
//         dispatch({
//             type: CHECK_STUDENT_ROLL_SUCCESS,
//             payload: res.data,
//         })
//         return res;
        
//     }catch(err){  
//         dispatch({
//             type: CHECK_STUDENT_ROLL_FAIL,
//         })      
//     }

//     return {"code":"warning","msg":"something went wrong and could not Render Data...."}
    
// }

export const checkStudentDetails = (roll) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/check_student_exists/${roll}`,config)
        // console.log(res.data);
        dispatch({
            type: CHECK_STUDENT_ROLL_SUCCESS,
            payload: res.data,
        })

        return res;
    }catch(err){

        dispatch({
            type: CHECK_STUDENT_ROLL_FAIL,
        })
        
    }

    return {"code":"warning","msg":"something went wrong and could not fetch...."}
    
}


export const getStudentDetails = (roll) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_individual_sem_analysis/${roll}`,config)
        // console.log(res.data);
        dispatch({
            type: GET_STUDENT_DETAILS_SUCCESS,
            payload: res.data,
        })

        return res.data;
    }catch(err){

        dispatch({
            type: GET_STUDENT_DETAILS_FAIL,
        })
        
    }

   // return {"code":"warning","msg":"something went wrong and could not fetch...."}
    
}












// ----------------------------- this is list of function for API for FILTER PAGE -------------------------------- 









// this function will fetch only branch and regulation from server

export const fetchdata1 = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetchdata1`,config)
        // console.log(res.data);
        dispatch({
            type: GET_FETCH_DATA_1_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_FETCH_DATA_1_FAIL,
        })
    }
}



//  pass the data for branch and reg to fetch data of particular batch from that regulation

export const fetchdatafun2 = (reg) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const regVal =  parseInt(reg);

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetchdata2/${regVal}`,config)
        // console.log(res.data);
        dispatch({
            type: GET_FETCH_DATA_2_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_FETCH_DATA_2_FAIL,
        })
    }
}



//Api for Sem Wise Back log Data for individual student (Fetch Student Details Page)
export const semWiseBacklogData = (roll) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // const rollVal =  parseInt(roll);
    console.log(roll)

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/semWiseBacklogData/${roll}`,config)
        // console.log(res.data);
        dispatch({
            type: GET_SEM_WISE_BACKLOG_ANALYSIS_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_SEM_WISE_BACKLOG_ANALYSIS_FAIL,
        })
    }
}



// pass the data for reg and fetch the section and sems data


export const fetchdatafun3 = (branch,reg,batch) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const regVal =  parseInt(reg);

    const branchVal =  parseInt(branch);

    const batchVal =  parseInt(batch);

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/fetchdata3/${regVal}/${branchVal}/${batchVal}`,config)
        // console.log(res.data);
        dispatch({
            type: GET_FETCH_DATA_3_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_FETCH_DATA_3_FAIL,
        })
    }
}





export const postFilterData = (data) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // };

    // const body = JSON.stringify({ branch,reg,batch,sems,cgpa,backlog,sect });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/filter`, data);
        // console.log(res);
        dispatch({
            type:  POST_FILTER_DATA_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_FILTER_DATA_FAIL
        })
    }
};



// ADD DATA API - post api for adding new regulation

export const postAddReg = (data) => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/addreg`, data);
        // console.log(res);
        dispatch({
            type:  POST_ADD_REG_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ADD_REG_FAIL
        })
    }
};
//ADD batch API - post api for adding new batch
export const postAddBatch = (data) => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/addbatch`, data);
        // console.log(res);
        dispatch({
            type:  POST_ADD_BATCH_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ADD_BATCH_FAIL
        })
    }
};

// ADD DATA API - post api for adding new Branch

export const postAddBranch = (data) => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/addbranch`, data);
        // console.log(res);
        dispatch({
            type:  POST_ADD_BRANCH_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_ADD_BRANCH_FAIL
        })
    }
};




// This API will Fetch all the data related to Admin Page, Branches, Regulation, Batches


export const getAllAdminData = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // console.log("inside vis");
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/getAllAdminData`,config)
        // console.log(res.data);
        dispatch({
            type: GET_ALL_ADMIN_DATA_SUCCESS,
            payload: res.data,
        })
        
    }catch(err){
        dispatch({
            type: GET_ALL_ADMIN_DATA_FAIL,
        })
    }
}




export const editBranch = (id) => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/editBranch`, id);
        // console.log(res);
        dispatch({
            type:  POST_EDIT_BRANCH_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_EDIT_BRANCH_FAIL
        })
    }
};




export const deleteBranch = (id) => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/dltBranch`, id);
        // console.log(res);
        dispatch({
            type:  POST_DELETE_BRANCH_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: POST_DELETE_BRANCH_FAIL
        })
    }
};

