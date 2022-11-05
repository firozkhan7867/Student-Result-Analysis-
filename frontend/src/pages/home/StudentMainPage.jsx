import React ,{useState}from 'react';
import { Link, useNavigate } from "react-router-dom";
// import "./home.css";
import "./student.css";
import { connect } from "react-redux";
import {checkStudentDetails,getStudentDetails} from "../../actions/visua";


const StudentMainPage = ({checkStudentDetails,getStudentDetails,tog,sidebar}) => {

    const tt = ()=>{
        tog(!sidebar); 
    }

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
            <div className='home main-container'>
                <div className="mx-3 my-3 d-flex justify-content-between">
                <div className="" onClick={tt}>
                    <button   class="navbar-toggler navbar-light bg-light px-2 py-1 rounded" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button> <span className='fw-light text-secondary mx-2'>Toggle Side bar</span>
                </div>
                <div className="mx-3 ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Student Analysis</li>
                    </ol>
                </div>
            </div>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center cardd">
                        <div className="card w-75 bg-white p-4 my-5">
                            <div className="text-center my-2">
                                <h3 className='card-title'>Student Results Report Analysis Section</h3>
                                <hr />
                            </div>
                            {alert}
                            <div className="d-flex justify-content-center my-2 text-center">
                                <form>
                                    <div className="">
                                        <input type="text" name="roll" className='form-control my-4' onChange={e => onChange(e)} placeholder='rollnumber' />
                                        <button type='button' onClick={onSubmit} className='btn'>Generate</button>
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

export default connect(null,{checkStudentDetails,getStudentDetails})(StudentMainPage);

// export default StudentMainPage;

