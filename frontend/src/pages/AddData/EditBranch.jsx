import React from 'react';
import { connect } from 'react-redux';


const EditBranch = ({ }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className='text-center my-5 w-100' >
                <p className='fw-bolder fs-2 my-2'>Edit  Batch Details</p>
                <br />
                <br />
                {/* <div className="d-flex justify-content-around">
                        <div className=""></div>
                    </div> */}
                <div className="">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>CSE</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>ECE</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>EEE</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>MECH</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>CIVIL</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>IT</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}



export default connect(null, {})(EditBranch);