import React from 'react';


const AddBatch = () => {
    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center">
                <form className='text-center my-5'  >
                    <p className='fw-bolder fs-2 my-2'>ADD BATCH</p>
                    <br />
                    <br />
                    <select className='form-control'>
                        <option value = "r19">R19</option>
                        <option value = "r20">R20</option>
                    </select>
                    <br/>
                    <input type="text" name="branch" placeholder='Enter Branch Name' className='form-control'  />
                    <button type='submit' className='btn btn-secondary mt-4'>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default AddBatch;
