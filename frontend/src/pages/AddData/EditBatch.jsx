import React from 'react';
import { connect } from 'react-redux';


const EditBatch = ({ adminData }) => {
    const branchs = adminData.batch;

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
                                <th scope="col">Regulation</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>2017 - 2021</td>
                                <td>R-15</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>2018 - 2022</td>
                                <td>R-15</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>2019 - 2023</td>
                                <td>R-19</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>2020 - 2024</td>
                                <td>R-20</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>2021 - 2025</td>
                                <td>R-20</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>2022 - 2026</td>
                                <td>R-20</td>
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

const mapStateToProps = state => ({
    adminData: state.auth.adminData,
});

export default  connect(mapStateToProps,{})(EditBatch);