import React ,{useState}from 'react';
import { useNavigate } from "react-router-dom";
// import "./home.css";
import "./student.css";
import { connect } from "react-redux";
import {checkStudentDetails,getStudentDetails} from "../../actions/visua";


const FilterMainPage = ({checkStudentDetails,getStudentDetails}) => {
    

    const [formData, setFormData] = useState({
        roll:'',
    });
    
    const [alert, setAlert] = useState('');
    let history = useNavigate();
    const {roll} = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        setAlert("");
    }


    const onSubmit = () =>{
        let path= `/studentReport/${roll}`;
        checkStudentDetails(roll).then(() => {
            setAlert(<div className={`alert alert-${JSON.parse(localStorage.getItem("checkRoll")).code} alert-dismissible fade show d-flex justify-content-between`} role="alert">
                            <div className="" >
                                <strong>Alert ...!!</strong> {JSON.parse(localStorage.getItem("checkRoll")).msg}
                             </div>
                             <button type="button" onClick={() => {setAlert('')}} className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </button>
                         </div>)
             if (JSON.parse(localStorage.getItem("checkRoll")).code === "success"){
                    setAlert(<div className={`alert alert-success alert-dismissible fade show d-flex justify-content-between`} role="alert">
                                <div className="" >
                                    <strong>Success .. !! </strong> Fetching Student Details. You will be redirected in few second please wait....
                                </div>
                                <button type="button" onClick={() => {setAlert('')}} className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>);
                    getStudentDetails(roll).then(
                        history(path));
                    localStorage.setItem('studentRoll',roll);
                        
                }   
        });
    }



  return (
            <div className='home'>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center">
                        <div className="card w-100 bg-white p-4 my-2">
                            <div className="text-center my-2">
                                <h3 className='card-title'>Filter Students and Generate Data</h3>
                            </div>
                                <hr  className='w-100'/>
                            {alert}
                            <div className=" w-100 my-4 text-center">
                                <form>
                                    <div className="d-flex justify-content-around mx-4">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Branch: </h5>
                                            <select name="branch" className="form-control mx-2">
                                                <option value="-">Select</option>
                                                <option value="all">All Branch</option>
                                                <option value="CSE">CSE</option>
                                                <option value="IT">IT</option>
                                                <option value="ECE">ECE</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="MECH">MECH</option>
                                                <option value="EEE">EEE</option>
                                                <option value="CSED">CSE-D</option>
                                                <option value="CSEAI">CSE-AL/ML</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Regulation: </h5>
                                            <select name="reg" className="form-control mx-2">
                                                <option value="all">Select</option>
                                                <option value="1">R-15</option>
                                                <option value="2">R-19</option>
                                                <option value="3">R-20</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Batch: </h5>
                                            <select name="batch" className="form-control mx-2">
                                                <option value="-">Select</option>
                                                <option value="all">All Branch</option>
                                                <option value="CSE">CSE</option>
                                                <option value="IT">IT</option>
                                                <option value="ECE">ECE</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="MECH">MECH</option>
                                                <option value="EEE">EEE</option>
                                                <option value="CSED">CSE-D</option>
                                                <option value="CSEAI">CSE-AL/ML</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around mx-4 my-5">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Section: </h5>
                                            <select name="branch" className="form-control mx-2">
                                                <option value="all">ALL Sections</option>
                                                <option value="1">Section - 1</option>
                                                <option value="2">Section - 2</option>
                                                <option value="3">Section - 3</option>
                                                <option value="4">Section - 4</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Backlogs: </h5>
                                            <select name="branch" className="form-control mx-2">
                                                <option value="-">Select</option>
                                                <option value="clear" selected>All Clear</option>
                                                <option value="1">1 Backlog</option>
                                                <option value="2">2 Backlogs</option>
                                                <option value="3">3 Backlogs</option>
                                                <option value="4">4 Backlogs</option>
                                                <option value="2">Backlogs {"  > "} 4</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >CGPA: </h5>
                                            <select name="branch" className="form-control mx-2">
                                                <option value="all" selected>All CGPA</option>
                                                <option value="1">CGPA  {"  >  "}  9</option>
                                                <option value="2">CGPA  {"  >  "}  8</option>
                                                <option value="3">CGPA  {"  >  "}  7</option>
                                                <option value="4">CGPA  {"  >  "}  6</option>
                                                <option value="5">CGPA  {"  >  "}  5</option>
                                                <option value="6">CGPA  {"  <  "}  5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex mx-4 my-5 w-50">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Semester: </h5>
                                            <select name="branch" className="form-control mx-2" multiple>
                                                <option value="all">All Semesters</option>
                                                <option value="1">I Sem</option>
                                                <option value="2">II Sem</option>
                                                <option value="3">III Sem</option>
                                                <option value="4">IV Sem</option>
                                                <option value="5">V Sem</option>
                                                <option value="6">VI Sem</option>
                                                <option value="7">VII Sem</option>
                                                <option value="8">VIII Sem</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center mt-5">
                                <h6 className='card-subtitle card-subtitle mb-2'>Please enter the student roll number to generate Results report Analysis</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}



// const mapStateToProps = state => ({
//     semVisData: state.auth.semVisData
// });

export default connect(null,{checkStudentDetails,getStudentDetails})(FilterMainPage);

// export default StudentMainPage;

