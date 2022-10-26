import React from 'react';


const AddBranch = () => {
    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center">
                <form className='text-center my-5' >
                    <p className='fw-bolder fs-2 my-2'>ADD Branch</p>
                    <br />
                    <br />
                    <input type="text" name="branch" placeholder='Enter Branch Name' className='form-control'  />
                    <button className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddBranch;
