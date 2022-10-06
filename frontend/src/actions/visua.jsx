import {
    FETCH_VIS_DATA_SUCCESS,
    FETCH_VIS_DATA_FAIL,
    FETCH_SUBJ_DATA_SUCCESS,
    FETCH_SUBJ_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_SUCCESS,
    FETCH_REGULATION_DATA_SUCCESS,
    FETCH_REGULATION_DATA_FAIL,
    POST_REGULATION_DATA_FAIL,
    POST_REGULATION_DATA_SUCCESS,
    CHECK_FETCH_DATA_SUCCESS,
    CHECK_FETCH_DATA_FAIL,
    CHECK_STUDENT_ROLL_SUCCESS,
    CHECK_STUDENT_ROLL_FAIL,
    GET_STUDENT_DETAILS_SUCCESS,
    GET_STUDENT_DETAILS_FAIL,
    SAVEID
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



