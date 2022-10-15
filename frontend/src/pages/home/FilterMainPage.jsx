import React ,{useState}from 'react';
import "./student.css";
import { batch, connect } from "react-redux";
import {fetchdatafun2} from "../../actions/visua";


const FilterMainPage = ({fetchdata1, fetchdata2,fetchdatafun2}) => {

    const branchData = fetchdata1["branch"];
    const regData = fetchdata1["regulation"];
    const batchData = fetchdata2["batch"];
    

    const [formData, setFormData] = useState({
        branch:'',
        reg:'',
    });
    
    const [alert, setAlert] = useState('');
    const {roll} = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
        // setAlert("");
        // console.log(e.target.name);
        // console.log(e.target.value);
    }

    const onChangeReg = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
        console.log(formData["reg"]);
        // fetchdatafun2(formData["reg"]);

    }


    const onSubmit = () =>{
        let path= `/studentReport/${roll}`;
        // checkStudentDetails(roll).then(() => {
        //     setAlert(<div className={`alert alert-${JSON.parse(localStorage.getItem("checkRoll")).code} alert-dismissible fade show d-flex justify-content-between`} role="alert">
        //                     <div className="" >
        //                         <strong>Alert ...!!</strong> {JSON.parse(localStorage.getItem("checkRoll")).msg}
        //                      </div>
        //                      <button type="button" onClick={() => {setAlert('')}} className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                      </button>
        //                  </div>)
        //      if (JSON.parse(localStorage.getItem("checkRoll")).code === "success"){
        //             setAlert(<div className={`alert alert-success alert-dismissible fade show d-flex justify-content-between`} role="alert">
        //                         <div className="" >
        //                             <strong>Success .. !! </strong> Fetching Student Details. You will be redirected in few second please wait....
        //                         </div>
        //                         <button type="button" onClick={() => {setAlert('')}} className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
        //                             <span aria-hidden="true">&times;</span>
        //                         </button>
        //                     </div>);
        //             getStudentDetails(roll).then(
        //                 history(path));
        //             localStorage.setItem('studentRoll',roll);
                        
        //         }   
        // });
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
                                            <select name="branch" className="form-control mx-2"  onChange={e => onChange(e)}>
                                                <option value="all">Select</option>
                                                {branchData.map((value,index)=>{
                                                    return <option value={value.id} key={index}>{value.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Regulation: </h5>
                                            <select name="reg" className="form-control mx-2" onChange={e => onChangeReg(e)}>
                                                <option value="0">Select</option>
                                                {regData.map((value,index)=>{
                                                    return <option value={value.id} key={index}>{value.name}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Batch: </h5>
                                            <select name="batch" className="form-control mx-2">
                                                <option value="all">Select</option>
                                                {
                                                    batchData.map((value,index)=>{
                                                        return <option value={value.id} key={index}>{value.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around mx-4 my-5">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Section: </h5>
                                            <select name="branch" className="form-control mx-2">
                                                <option value="all">ALL Sections</option>
                                                <option value="1">Section - 1</option>
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



const mapStateToProps = state => ({
    fetchdata1: state.auth.fetchdata1,
    fetchdata2: state.auth.fetchdata2,
});

export default connect(mapStateToProps,{fetchdatafun2})(FilterMainPage);

// export default StudentMainPage;

