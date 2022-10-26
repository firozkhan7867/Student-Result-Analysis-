import React from 'react';


const AddReg = () => {
    return (
        <div className='h-100'>
            <div className="d-flex justify-content-center text-center">
                <form className='text-center my-2' >
                    <div className="w-100 d-flex justify-content-center">
                        <div className="w-50">
                            <p className='fw-bolder fs-2 my-2'>ADD New Regulation</p>
                            <br />
                            <input type="text" name="branch" placeholder='Regulation Name' className='form-control my-2'  />
                            <input type="text" name="branch" placeholder='year' className='form-control'  />
                        </div>
                    </div>

                    <button type='button' className='btn btn-primary mt-4'>Add Grades</button>


                    <div className=" my-3 w-100 px-4">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex w-50">
                                <input type="text" placeholder='grade' className='rounded-start' name="grade" />
                                <input type="text" placeholder='value' name="value"  className=' rounded-end' />
                            </div>
                            <div className="mx-2">
                                <button className='btn btn-info'>Edit</button>
                            </div>
                            <div className="mx-2">
                                <button className='btn btn-danger'>Delete</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddReg;
