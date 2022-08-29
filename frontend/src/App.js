import "./app.css";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
// import Login from "./pages/auth/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
function App() {
  return (
    <div className="App">
    <Provider store={store}>
        <Router>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/analysis' component={AnalysisDashboard} />
                    <Route path="/login"  component={Loginpage}/>
                    <Route exact path='/signup' component={Signup} />
                    <Route path="/reset-password"  component={ResetPassword}/>
                    <Route path="/password/reset/confirm/:uid/:token"  component={ResetPasswordConfirm}/>
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/upload' component={UploadSem} />
                    <Route exact path='/backdata' component={BackUpSem} />
                    <Route exact path='/student' component={Student} />
                    <Route exact path='/studentReport' component={StudentMainDashboard} />
                    <Route exact path='/studentReport/:roll' component={StudentReportDashboard} />
                    <Route exact path='/fetch' component={FetchDataDashboard} />
                </Switch>
        </Router>
    </Provider>
    </div>
  );
}


export default App;
