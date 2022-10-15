import React ,{useState}from 'react';
import "./student.css";
import { batch, connect } from "react-redux";
import {fetchdatafun2,fetchdatafun3} from "../../actions/visua";


const FilterMainPage = ({fetchdata1, fetchdata2,fetchdata3,fetchdatafun2,fetchdatafun3}) => {

    const branchData = fetchdata1["branch"];
    const regData = fetchdata1["regulation"];
    const batchData = fetchdata2["batch"];
    const sectData = fetchdata3["section"];
    const semData = fetchdata3["sems"];
    

    const [formData, setFormData] = useState({
        branch:'',
        reg:'',
        batch:'',
        sems:'',
        cgpa:'',
        backlog:'',
        sect:'',
    });
    
    const [alert, setAlert] = useState('');
    const {branch,reg,batch,sems,cgpa,backlog,sect} = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const onChangeReg = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
        fetchdatafun2(e.target.value);
    }

    const onChangeBatch = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
        // console.log(branch,reg,batch);
        // console.log(e.target.value,e.target.name);
        fetchdatafun3(branch,reg,e.target.value);
        // console.log(branchData,regData,batchData);
    }

    const onChangeMul = e =>{
        let sems = Array.from(e.target.selectedOptions, option => option.value);
        // console.log(sems);
        // console.log(e.target.selectedOptions);
        setFormData({...formData,[e.target.name]: sems});
    }


    const onSubmit = (event) =>{
        event.preventDefault();

        console.log(formData);
        // let path= `/studentReport/${roll}`;
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
                                <form onSubmit={onSubmit}>
                                    <div className="d-flex justify-content-around mx-4">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Branch: </h5>
                                            <select name="branch" className="form-control mx-2" value={branch}  onChange={e => onChange(e)}>
                                                <option value="-">Select</option>
                                                { branchData ?
                                                    branchData.map((value,index)=>{
                                                        return <option value={value.id} key={index}>{value.name}</option>
                                                    })
                                                    :
                                                    <option value="-">No Data Available</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Regulation: </h5>
                                            <select name="reg" className="form-control mx-2" value={reg} onChange={e => onChangeReg(e)}>
                                                <option value="-">Select</option>
                                                { regData ?
                                                    regData.map((value,index)=>{
                                                        return <option value={value.id} key={index}>{value.name}</option>
                                                    })
                                                    :
                                                    <option value="-">No Data Available</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Batch: </h5>
                                            <select name="batch" className="form-control mx-2" value={batch}  onChange={e => onChangeBatch(e)} >
                                                <option value="-">Select</option>
                                                { batchData ?
                                                    batchData.map((value,index)=>{
                                                        return <option value={value.id} key={index}>{value.name}</option>
                                                    })
                                                    :
                                                    <option value="-">No Data Available</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around mx-4 my-5">
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Section: </h5>
                                            <select name="sect" className="form-control mx-2" value={sect} onChange={e => onChange(e)}>
                                                <option value="-">Select</option>
                                                { sectData ?
                                                    sectData.map((value,index)=>{
                                                        return <option value={value} key={index}>{value}</option>
                                                    })
                                                    :
                                                    <option value="-">No Data Available</option>
                                                }
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >Backlogs: </h5>
                                            <select name="backlog" className="form-control mx-2" value={backlog} onChange={e => onChange(e)}>
                                                <option value="-">Select</option>
                                                <option value="clear">All Clear</option>
                                                <option value="1">1 Backlog</option>
                                                <option value="2">2 Backlogs</option>
                                                <option value="3">3 Backlogs</option>
                                                <option value="4">4 Backlogs</option>
                                                <option value="2">Backlogs {"  > "} 4</option>
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center w-100 mx-4">
                                            <h5 >CGPA: </h5>
                                            <select name="cgpa" className="form-control mx-2" value={cgpa} onChange={e => onChange(e)}>
                                                <option value="all" >All CGPA</option>
                                                <option value="1">CGPA  {"  >  "}  9</option>
                                                <option value="2">CGPA  {"  >  "}  8</option>
                                                <option value="3">CGPA  {"  >  "}  7</option>
                                                <option value="4">CGPA  {"  >  "}  6</option>
                                                <option value="5">CGPA  {"  >  "}  5</option>
                                                <option value="6">CGPA  {"  <  "}  5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex mx-4 justify-content-center w-100 my-5 w-50">
                                        <div className="d-flex align-items-center w-25 mx-4">
                                            <h5 >Semester: </h5>
                                            <select name="sems" className="form-control mx-2" multiple  onChange={e => onChangeMul(e)} >
                                                { semData ?
                                                    semData.map((value,index)=>{
                                                        return <option value={value.id} key={index}>{value.name} - Semester</option>
                                                    })
                                                    :
                                                    <option value="-">No Data Available</option>
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center text-center w-100 align-items-center mx-4">
                                        <button type='submit'className='btn-primary btn form-control w-25'>submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center w-100 mt-5 ">
                                <h3 className='text-center my-5 fw-bold fs-1'>Generated Data is-</h3>
                                <div className="my-4 mx-5">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        </tr>
                                        <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
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
    fetchdata3: state.auth.fetchdata3,
});

export default connect(mapStateToProps,{fetchdatafun2,fetchdatafun3})(FilterMainPage);

// export default StudentMainPage;

