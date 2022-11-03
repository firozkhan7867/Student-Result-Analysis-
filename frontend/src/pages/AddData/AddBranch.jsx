import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postAddBranch } from '../../actions/visua';
import Alert from "../../components/alert/Alert";

const AddBranch = ({postAddBranch}) => {
    const [formdata,setFormData] = useState({
		branch:"",
	});
	const [alert,setAlert] = useState('');
    const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value});

	const {branch} = formdata;

    const onSubmit = (e) =>{
		e.preventDefault();
        console.log(branch);
		const data  = new FormData();
        var payload={};
        data.append('branch', branch);
		// postAddBranch(data);
		// console.log(b)
        postAddBranch(data).then((res)=>{
            console.log("[AddBranch]"+JSON.stringify(JSON.parse(localStorage.getItem("addbranch"))));
            console.log("[AddBranch2]"+JSON.parse(localStorage.getItem("addbranch")).code);
            payload=JSON.parse(localStorage.getItem("addbranch"));
            
            // if(JSON.parse(localStorage.getItem("addbrach")).msg === "Error"){
            setAlert(<Alert type={payload.msg.toLowerCase()} msg={payload.message.toLowerCase()} bb={payload.code} onclick={setAlert} />)
            
        }).catch( (err) =>{
            
            console.log(err);
        }
        );
	}

    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center">
                <form className='text-center my-5' onSubmit={(e) => onSubmit(e)} >
                    <p className='fw-bolder fs-2 my-2'>ADD Branch</p>
                    <br />
                    {alert}
                    <br />
                    <input type="text" name="branch" placeholder='Enter Branch Name' onChange={(e) => onChange(e)}  className='form-control'  />
                    <button type='submit' className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default connect(null,{postAddBranch})(AddBranch);
