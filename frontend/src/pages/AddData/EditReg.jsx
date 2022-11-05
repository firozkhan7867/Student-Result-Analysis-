import React from 'react'

const EditReg = () => {
  return (
        <div className="d-flex justify-content-center">
            <div className='text-center my-5 w-100' >
                <p className='fw-bolder fs-2 my-2'>Edit  Reg Details</p>
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
                                <th scope="col">Year</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>R-15</td>
                                <td>2015 - 2018</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>R-19</td>
                                <td>2019 - 2020</td>
                                <td className='d-flex justify-content-center'>
                                    <button className='btn btn-success mx-2'>EDIT</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>R-20</td>
                                <td>2020 - present</td>
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

export default EditReg