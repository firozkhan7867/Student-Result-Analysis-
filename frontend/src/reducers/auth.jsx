/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GET_UP_DATA_SUCCESS,
    GET_UP_DATA_FAIL,
    GET_BACK_DATA_FAIL,
    GET_BACK_DATA_SUCCESS,
    FETCH_VIS_DATA_SUCCESS,
    FETCH_VIS_DATA_FAIL,
    FETCH_SUBJ_DATA_SUCCESS,
    FETCH_SUBJ_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_FAIL,
    FETCH_SUBJ_SECT_DATA_SUCCESS,
    FETCH_REGULATION_DATA_FAIL,
    FETCH_REGULATION_DATA_SUCCESS,
    CHECK_FETCH_DATA_SUCCESS,
    CHECK_FETCH_DATA_FAIL,
    CHECK_STUDENT_ROLL_FAIL,
    CHECK_STUDENT_ROLL_SUCCESS,
    GET_STUDENT_DETAILS_SUCCESS,
    GET_STUDENT_DETAILS_FAIL,
    SAVEID,
    GET_FETCH_DATA_1_SUCCESS,
    GET_FETCH_DATA_1_FAIL,
    GET_FETCH_DATA_2_SUCCESS,
    GET_FETCH_DATA_2_FAIL,
    GET_FETCH_DATA_3_FAIL,
    GET_FETCH_DATA_3_SUCCESS,
    POST_FILTER_DATA_SUCCESS,
    POST_FILTER_DATA_FAIL,
    POST_ADD_REG_SUCCESS,
    POST_ADD_REG_FAIL,
    POST_ADD_BRANCH_SUCCESS,
    POST_ADD_BRANCH_FAIL,
    GET_SEM_WISE_BACKLOG_ANALYSIS_SUCCESS,
    GET_SEM_WISE_BACKLOG_ANALYSIS_FAIL,
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    updata: null,
    backdata: null,
    semVisData: null,
    subjVisData: null,
    subjSectAnalysis: null,
    semDetails:{"name":"error","reg":"error","branch":"error","batch":"error"},
    semId: null,
    RegulationData: { regData: [], batchData: [], branchData: [] },
    checkFetchSem: { "code": "not", "msg": "none" },
    failPercentageSection: [0, 0, 0, 0],
    toppersData: { 1: [], 2: [], 3: [], 4: [], "allSection": [], "onlysections": [] },
    checkRoll: { "code": "warning", "msg": "something went Wrong .. couldn't  process the request" },
    studentdetails: { "cgpas": [null, null, null, null, null, null, null, null],"roll": null,
                        "details":{ "name":null, "email":null,"mobile":null, "dob":null,"father":null, "aadhar":null, "address":null, "roll":null, "section":null,"branch":null} },
    fetchdata1: {"branch":[],"regulation":[],"status":false},
    fetchdata2: {"batch":[],"status":false},
    fetchdata3:{"section":[],"sems":[],"status":false},
    filteredData:{},
    logfail:false,
    semWiseBacklogData:{"allBacklogs":[0,0,0,0,0,0,0,0],"clearedBacklogs":[0,0,0,0,0,0,0,0]},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            localStorage.setItem("logfail",JSON.stringify(false));
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                logfail:false,
            }
        case GET_UP_DATA_SUCCESS:
            // console.log(state.updata)
            return {
                ...state,
                updata: payload.updata
            }
        case GET_BACK_DATA_SUCCESS:
            // console.log(state.updata)
            return {
                ...state,
                backdata: payload.updata
            }
        case GET_UP_DATA_FAIL:
            return {
                ...state,
                updata: null
            }
        case GET_BACK_DATA_FAIL:
            return {
                ...state,
                backdata: null
            }
        case FETCH_SUBJ_SECT_DATA_SUCCESS:
            localStorage.setItem('subjSectAnalysis', JSON.stringify(payload.data));
            // console.log(payload.data.failPercentageSection);
            return {
                ...state,
                subjSectAnalysis: payload.data,
                failPercentageSection: payload.data.failPercentageSection,
                toppersData: payload.data.eachSectionTopData
            }
        case FETCH_SUBJ_SECT_DATA_FAIL:
            localStorage.removeItem('subjSectAnalysis');
            return {
                ...state,
                subjSectAnalysis: null,
                failPercentageSection: [0, 0, 0, 0],
                toppersData: { 1: [], 2: [], 3: [], 4: [], "allSection": [], "onlysections": [] }
            }
        case FETCH_REGULATION_DATA_SUCCESS:
            localStorage.setItem('regulationData', JSON.stringify(payload.data));
            return {
                ...state,
                RegulationData: payload.data
            }
        case FETCH_REGULATION_DATA_FAIL:
            localStorage.setItem('regulationData', JSON.stringify({ regData: [], batchData: [], branchData: [] }));
            return {
                ...state,
                RegulationData: { regData: [], batchData: [], branchData: [] },
            }
        case CHECK_FETCH_DATA_SUCCESS:
            localStorage.setItem('checkFetchSem', JSON.stringify(payload));
            return {
                ...state,
                checkFetchSem: payload,
            }
        case CHECK_FETCH_DATA_FAIL:
            localStorage.setItem("checkFetchSem", JSON.stringify({ "code": "not", "msg": "none" }));
            return {
                ...state,
                checkFetchSem: { "code": "not", "msg": "none" },
            }
        case CHECK_STUDENT_ROLL_SUCCESS:
            localStorage.setItem("checkRoll", JSON.stringify(payload));
            return {
                ...state,
                checkRoll: payload,
            }
        case CHECK_STUDENT_ROLL_FAIL:
            localStorage.setItem("checkRoll", JSON.stringify({ "code": "warning", "msg": "something went Wrong .. couldn't  process the request" }));
            return {
                ...state,
                checkRoll: { "code": "warning", "msg": "something went Wrong .. couldn't  process the request" },
            }


        case GET_STUDENT_DETAILS_SUCCESS:
            localStorage.setItem("studentdetails", JSON.stringify(payload));
            return {
                ...state,
                studentdetails: payload,
            }
        case GET_STUDENT_DETAILS_FAIL:
            localStorage.setItem("studentdetails", JSON.stringify({ "cgpas": [null, null, null, null, null, null, null, null],"roll": null,"details":{ "name":null, "email":null,"mobile":null, "dob":null,"father":null, "aadhar":null, "address":null, "roll":null, "section":null,"branch":null} }));
            return {
                ...state,
                studentdetails: { "cgpas": [null, null, null, null, null, null, null, null],"roll": null,"details":{ "name":null, "email":null,"mobile":null, "dob":null,"father":null, "aadhar":null, "address":null, "roll":null, "section":null,"branch":null} },
            }


        case SAVEID:
            localStorage.setItem('semId', payload);
            return{
                ...state,
                semId: payload,
            }

        //   -------------------------     FETCH BRANCH AND REGULATIONS    ---------------------------

        case GET_FETCH_DATA_1_SUCCESS:
            localStorage.setItem("branchdata",JSON.stringify(payload));
            // console.log(payload)
            return {
                ...state,
                fetchdata1: payload,
            }
        
        case GET_FETCH_DATA_1_FAIL:
            localStorage.removeItem("branchdata");
            return {
                ...state,
                fetchdata1: {"branch":[],"regulation":[],"status":false},
            }


            case GET_SEM_WISE_BACKLOG_ANALYSIS_SUCCESS:
            localStorage.setItem("semWiseBacklogData",JSON.stringify(payload));
            // console.log(payload)
            return {
                ...state,
                semWiseBacklogData: payload,
            }
        
            case GET_SEM_WISE_BACKLOG_ANALYSIS_FAIL:
                localStorage.removeItem("semWiseBacklogData");
                return {
                    ...state,
                    semWiseBacklogData: {"allBacklogs":[0,0,0,0,0,0,0,0],"clearedBacklogs":[0,0,0,0,0,0,0,0]},
                }


        case GET_FETCH_DATA_2_SUCCESS:
            localStorage.setItem("regFetchData",JSON.stringify(payload));
            // console.log(payload)
            return {
                ...state,
                fetchdata2: payload,
            }
        
        case GET_FETCH_DATA_2_FAIL:
            localStorage.removeItem("regFetchData");
            return {
                ...state,
                fetchdata2: {"batch":[],"status":false},
            }   

        case GET_FETCH_DATA_3_SUCCESS:
            localStorage.setItem("sectSemData",JSON.stringify(payload));
            // console.log(payload);
            return {
                ...state,
                fetchdata3: payload,
            }
        
        case GET_FETCH_DATA_3_FAIL:
            localStorage.removeItem("sectSemData");
            return {
                ...state,
                fetchdata3: {"section":[],"sems":[],"status":false},
            }  
        case POST_FILTER_DATA_SUCCESS:
            localStorage.setItem("filteredData",JSON.stringify(payload));
            console.log(payload);
            return{
                ...state,
                filteredData:payload
            } 
        case POST_FILTER_DATA_FAIL:
            localStorage.removeItem("filteredData");
            // console.log(payload);
            return{
                ...state,
                filteredData:{}
            } 
        case POST_ADD_REG_SUCCESS:
            localStorage.setItem("addreg",JSON.stringify(payload));
            return{
                ...state,
                addreg:payload
            }
        case POST_ADD_REG_FAIL:
            localStorage.setItem("addreg",JSON.stringify(payload));
            return{
                ...state,
                addreg:payload
            }
        case POST_ADD_BRANCH_SUCCESS:
            localStorage.setItem("addbranch",JSON.stringify(payload));
            return{
                ...state,
                addbranch:payload
            }
        case POST_ADD_BRANCH_FAIL:
            localStorage.setItem("addbranch",JSON.stringify(payload));
            return{
                ...state,
                addbranch:payload
            }
    
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case FETCH_VIS_DATA_SUCCESS:
            // console.log(payload);
            return {
                ...state,
                semVisData: payload.sem_performance,
                semDetails:payload.details,

            }
        case FETCH_VIS_DATA_FAIL:
            return {
                ...state,
                semVisData: null,
                semDetails:{"name":"error","reg":"error","branch":"error","batch":"error"},
            }
        case FETCH_SUBJ_DATA_SUCCESS:
            return {
                ...state,
                subjVisData: payload.data
            }
        case FETCH_SUBJ_DATA_FAIL:
            return {
                ...state,
                subjVisData: null,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }

        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
            localStorage.setItem("logfail",JSON.stringify(true));
            return{
                ...state,
                logfail:true,
            }
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        // case PASSWORD_RESET_SUCCESS:
        // case PASSWORD_RESET_FAIL:
        // case PASSWORD_RESET_CONFIRM_SUCCESS:
        // case PASSWORD_RESET_CONFIRM_FAIL:
        // case ACTIVATION_SUCCESS:
        // case ACTIVATION_FAIL:
        //     return {
        //         ...state
        //     }

        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        default:
            return state
    }
};



