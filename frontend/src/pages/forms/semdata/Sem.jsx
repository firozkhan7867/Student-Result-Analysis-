import {connect} from "react-redux";
import { GetUploadData, semupload } from '../../../actions/auth';
import { fetchdatafun2 } from '../../../actions/visua';
import React , {useState, Fragment} from 'react';
import { Navigate } from "react-router-dom";



const Sem = (props) => {

    const [imagefile,setimagefile] = useState();
    const [formData, setFormData] = useState({
        name:'',
        reg:'',
        branch:'',
        batch:'',
    });



    const {name,reg,branch,batch} = formData
    
    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }

    const onChangeReg = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
        props.fetchdatafun2(e.target.value);
    }

    const onChangeBatch = e =>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
        // console.log(branch,reg,batch);
        // console.log(e.target.value,e.target.name);
        // fetchdatafun3(branch,reg,e.target.value);
        // console.log(branchData,regData,batchData);
    }

    const onSubmit = e => {
        e.preventDefault();
        const data  = new FormData();
        data.append('name',name);
        data.append('reg', reg);
        data.append('branch',branch);
        data.append('batch',batch);
        data.append('file',imagefile);
        props.semupload(data);
        // const nav = useNavigate();
        // nav("/");
        <Navigate to="/" />
        name="";
        reg="";
        branch="";
        batch="";

    }

    
    const batchData = props.fetchdata2["batch"];
    
    const regdata = () =>{
        if (props.updata){
            if (props.updata.reg)
            {
            return <Fragment>
                {props.updata.reg.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.title}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }

    const branchdata = () =>{
        if (props.updata){
            if (props.updata.branch)
            {
            return <Fragment>
                {props.updata.branch.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.name}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }
    const batchdata = () =>{
        if (props.updata){
            if (props.updata.batch)
            {
            return <Fragment>
                {props.updata.batch.map((value, index) => {
                    return  <option value={value.id} key={index}>{value.name} of batch {value.reg}</option>;  
                })}
            </Fragment>
            }
        }
        else{
            return <Fragment>
                <option value="">none</option>
            </Fragment>
        }
    }

    
    return (
        <div>
            <section className="pt-5 pb-5 mt-0 align-items-center d-flex bg-dark ll" >
                <div className="container-fluid">
                <div className="row  justify-content-center align-items-center d-flex-row text-center h-100">
                    <div className="col-12 col-md-4 col-lg-4   h-50 ">
                    <div className="card shadow">
                        <div className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Upload Semester Data: </h4>
                        <br />
                        <form  className='text-start' onSubmit={e => onSubmit(e)}>
                            <div className="form-group  mb-4">
                                <label htmlFor="name">Semester Name</label>
                                {/* <input type="text" 
                                    className='form-control' id='name' onChange={e => onChange(e)} placeholder='Enter Semester Name' name='name'
                                    required
                                /> */}

                                <select name="name" id='name' onChange={e => onChange(e)} className="form-control" required>
                                    <option value="1">I Semester</option>
                                    <option value="2">II Semester</option>
                                    <option value="3">III Semester</option>
                                    <option value="4">IV Semester</option>
                                    <option value="5">V Semester</option>
                                    <option value="6">VI Semester</option>
                                    <option value="7">VII Semester</option>
                                    <option value="8">VIII Semester</option>
                                </select>
                                
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="reg">Select Regulation</label>
                                <select name="reg" id='reg' onChange={e => onChangeReg(e)} className="form-control">
                                    <option value=""> ---    ----</option>
                                    {regdata()}
                                    {/* { regData ?
                                        regData.map((value,index)=>{
                                            return <option value={value.id} key={index}>{value.name}</option>
                                        })
                                        :
                                        <option value="-">No Data Available</option>
                                    } */}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="branch">Select Branch</label>
                                <select name="branch" id='branch' onChange={e => onChange(e)} className="form-control">
                                    <option value=""> ----  ----</option>
                                    {branchdata()}
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="batch">Select Batch</label>
                                <select name="batch" id='batch' onChange={e => onChangeBatch(e)} className="form-control">
                                        <option value="">----    ----</option>
                                        {/* {batchdata()} */}
                                        { batchData ?
                                            batchData.map((value,index)=>{
                                                return <option value={value.id} key={index}>{value.name}</option>
                                            })
                                            :
                                            <option value="-">No Data Available</option>
                                        }
                                </select>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="file">Upload Pre-formatted Excel File</label>
                                <input type="file" name="file" id="file" onChange={(evt) => setimagefile(evt.target.files[0])}  className='form-control'/>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block px-5 mt-3 mb-2">Upload</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}


const mapStateToProps = state => ({
    updata: state.auth.updata,
    // fetchdata1: state.auth.fetchdata1,
    fetchdata2: state.auth.fetchdata2,
});



export default connect(mapStateToProps, { GetUploadData, semupload, fetchdatafun2 })(Sem);

