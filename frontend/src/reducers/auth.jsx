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
    GET_STUDENT_DETAILS_FAIL
} from '../actions/types';
import ToppersData from '../components/TopperData/ToppersData';

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
    semId: null,
    RegulationData: { regData: [], batchData: [], branchData: [] },
    checkFetchSem: { "code": "not", "msg": "none" },
    failPercentageSection: [0, 0, 0, 0],
    toppersData: { 1: [], 2: [], 3: [], 4: [], "allSection": [], "onlysections": [] },
    checkRoll: { "code": "warning", "msg": "something went Wrong .. couldn't  process the request" },
    studentdetails: { "cgpas": [null, null, null, null, null, null, null, null],"roll": null }
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
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
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
            localStorage.setItem("studentdetails", JSON.stringify({ "cgpas": [null, null, null, null, null, null, null, null],"roll": null }));
            return {
                ...state,
                studentdetails: { "cgpas": [null, null, null, null, null, null, null, null],"roll": null },
            }




        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case FETCH_VIS_DATA_SUCCESS:
            return {
                ...state,
                semVisData: payload.sem_performance

            }
        case FETCH_VIS_DATA_FAIL:
            return {
                ...state,
                semVisData: null
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



