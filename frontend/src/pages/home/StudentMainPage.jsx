import React from 'react';
// import "./home.css";
import "./student.css";



const StudentMainPage = ({}) => {
  return (
            <div className='home'>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center ">
                        <div className="card w-75 bg-white p-4 my-5">
                            <div className="text-center my-3">
                                <h3 className='card-title'>Student Results Report Analysis Section</h3>
                                <hr />
                            </div>
                            <div className="d-flex justify-content-center my-5 text-center">
                                <div className="">
                                    <input type="text" name="roll" className='form-control my-4' placeholder='rollnumber' />
                                    <button className='btn btn-success text-white'>Generate</button>
                                </div>
                            </div>
                            <div className="text-center">
                                <h6 className='card-subtitle card-subtitle mb-2 text-muted'>Please enter the student roll number to generate Results report Analysis</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default StudentMainPage;