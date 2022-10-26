import "./app.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
// import Login from "./pages/auth/Login";
// import NavBarExample from "./components/navbar/Navbar";
import { Provider } from 'react-redux';
import store from './store';
// import Logintest from "./pages/auth/LoginTest";
import Loginpage from "./pages/auth/LoginPage";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordConfirm from "./pages/auth/ResetPasswordConfirm";
import Activate from "./pages/auth/Activate";
import UploadSem from "./pages/forms/UploadSem";
import BackUpSem from "./pages/forms/BackUpSem";
import Student from "./pages/forms/Student";
import StudentReportDashboard from "./pages/dashboard/StudentReportDashboard";
// import StudentHome from "./pages/home/StudentHome";
import StudentMainDashboard from "./pages/dashboard/StudentMainDashboard";
import FetchDataDashboard from "./pages/dashboard/FetchDataDashboard";
import AnalysisDashboard from "./pages/dashboard/AnalysisDashboard";
import FilterDashboard from "./pages/dashboard/FilterDashboard";
import AddDataDashboard from "./pages/AddData/AddDataDashboard";
function App() {
  return (
    <div className="App">
    <Provider store={store}>
        <Router>
                <Routes>
                    <Route exact path='/' element={<Dashboard/>} />
                    <Route exact path='/analysis' element={<AnalysisDashboard/>} />
                    <Route path="/login"  element={<Loginpage/>}/>
                    <Route exact path='/signup' element={<Signup/>} />
                    <Route path="/reset-password"  element={<ResetPassword/>}/>
                    <Route path="/password/reset/confirm/:uid/:token"  element={<ResetPasswordConfirm/>}/>
                    <Route exact path='/activate/:uid/:token' element={<Activate/>} />
                    <Route exact path='/upload' element={<UploadSem/>} />
                    <Route exact path='/backdata' element={<BackUpSem/>} />
                    <Route exact path='/student' element={<Student/>} />
                    <Route exact path='/studentReport' element={<StudentMainDashboard/>} />
                    <Route exact path='/studentReport/:roll' element={<StudentReportDashboard/>} />
                    <Route exact path='/fetch' element={<FetchDataDashboard/>} />
                    <Route exact path='/filter' element={<FilterDashboard/>} />
                    <Route exact path='/addData' element={<AddDataDashboard/>} />
                </Routes>
        </Router>
    </Provider>
    </div>
  );
}


export default App;
