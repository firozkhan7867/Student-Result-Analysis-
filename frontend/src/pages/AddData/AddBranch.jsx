import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postAddBranch } from '../../actions/visua';


const AddBranch = ({postAddBranch}) => {
    const [formdata,setFormData] = useState({
		branch:"",
	});
	
    const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value});

	const {branch} = formdata;

    const onSubmit = (e) =>{
		e.preventDefault();
        console.log(branch);
		const data  = new FormData();
        data.append('branch', branch);
		postAddBranch(data);
		// console.log(b)
	}

    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center">
                <form className='text-center my-5' onSubmit={(e) => onSubmit(e)} >
                    <p className='fw-bolder fs-2 my-2'>ADD Branch</p>
                    <br />
                    <br />
                    <input type="text" name="branch" placeholder='Enter Branch Name' onChange={(e) => onChange(e)}  className='form-control'  />
                    <button type='submit' className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default connect(null,{postAddBranch})(AddBranch);
