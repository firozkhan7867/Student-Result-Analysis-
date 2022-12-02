import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postAddBatch } from '../../actions/visua';
import 'react-toastify/dist/ReactToastify.css';

const AddBatch = ({adminData,postAddBatch}) => {

    
    const regs = adminData.data.reg;

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
                    <p className='fw-bolder fs-2 my-2'>ADD BATCH Details</p>
                    <br />
                    <br />
                    <select className='form-control' name='reg' onChange={(e) => onChange(e)}>
                        {regs.map((value,index) =>{
                            return (
                                <option value={value.id}>{value.name} - {value.year}</option>
                            )
                        })}
                    </select>
                    <br/>
                    <input type="text" name="batch" placeholder='Enter Batch Name' onChange={(e) => onChange(e)} className='form-control'  />
                    <button type='submit' className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
            {/* <ToastContainer/> */}
        </div>
    )

}

const mapStateToProps = state => ({
    adminData: state.auth.adminData,
});



export default connect(mapStateToProps,{postAddBatch})(AddBatch);
