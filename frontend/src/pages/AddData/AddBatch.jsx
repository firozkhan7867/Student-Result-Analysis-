import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postAddBatch } from '../../actions/visua';

const AddBatch = ({postAddBatch}) => {

    const [formdata,setFormData] = useState({
		batch:"",
        reg:"",
	});
	
    const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value});

	const {reg,batch} = formdata;

    const onSubmit = (e) =>{
		e.preventDefault();
        console.log("batch:"+batch);
        console.log("reg:"+reg);
		const data  = new FormData();
        data.append('batch', batch);
        data.append('reg', reg);
		postAddBatch(data);
		// console.log(b)
	}



    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center">
                <form className='text-center my-5' onSubmit={(e) => onSubmit(e)} >
                    <p className='fw-bolder fs-2 my-2'>ADD BATCH</p>
                    <br />
                    <br />
                    <select className='form-control' name='reg' onChange={(e) => onChange(e)}>
                    <option value = "null">Select</option>
                        <option value = "r19">R19</option>
                        <option value = "r20">R20</option>
                    </select>
                    <br/>
                    <input type="text" name="batch" placeholder='Enter Batch Name' onChange={(e) => onChange(e)} className='form-control'  />
                    <button type='submit' className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )

}
export default connect(null,{postAddBatch})(AddBatch);
