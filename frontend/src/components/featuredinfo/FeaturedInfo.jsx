import React, { Fragment } from 'react';
import "./featuredinfo.css"
import { connect } from "react-redux";



const FeaturedInfo = (props) => {

    const failCount = () => {
        if (props.semVisData && props.semFailList) {
            console.log(props.semFailList);
            if (props.semVisData.Fail_count) {
                return <Fragment>
                    {props.semVisData.Fail_count}
                </Fragment>
            }
            else {
                if (props.semVisData.Fail_count === 0) {
                    return 0
                }
                return <Fragment>
                    No data Found
                </Fragment>
            }
        } else {
            return <Fragment>
                No data Found
            </Fragment>
        }
    }
    const passCount = () => {
        if (props.semVisData) {
            if (props.semVisData.Pass_count) {
                return <Fragment>
                    {props.semVisData.Pass_count}
                </Fragment>
            }
            else {
                return <Fragment>
                    No data Found
                </Fragment>
            }
        } else {
            return <Fragment>
                No data Found
            </Fragment>
        }
    }

    const regesterCount = () => {
        if (props.semVisData) {
            if (props.semVisData.Total_Registered) {
                return <Fragment>
                    {props.semVisData.Total_Registered}
                </Fragment>
            }
            else {
                return <Fragment>
                    No data Found
                </Fragment>
            }
        } else {
            return <Fragment>
                No data Found
            </Fragment>
        }
    }

    return (
        <div className='featured'>
            <div className="featuredItem total">
                <span className="featuredTitle">Total Applications</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{regesterCount()}</span>
                    {/* <span className="featuredMoneyRate"> -11.4   */}
                    {/* <ArrowDownward className='featuredIcon'/> */}
                    {/* </span> */}
                </div>
                <span className="featuredSb">
                    Students Registered
                </span>
            </div>
            <div className="featuredItem pass">
                <span className="featuredTitle">No of Students Passed</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{passCount()}</span>
                    {/* <span className="featuredMoneyRate"> -1.4  
                <ArrowDownward className='featuredIcon negative'/>
                </span> */}
                </div>
                <span className="featuredSb">
                    Students passed
                </span>
            </div>
            <div class="modal fade" id="editModel" aria-labelledby="editModelLabel" aria-hidden="true">
                <div class="modal-dialog  modal-dialog-scrollable modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModelLabel">View Semester Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <p class=" my-4 fw-bold fs-3 text-center">Failed List of Students :-</p>
                            {
                                props.semFailList.code ?
                                    <div class="mb-3 mx-4">
                                        <div className="">
                                            <table className="table table-hover" style={{ width: "98%" }}>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Roll</th>
                                                        <th scope="col">Student Name</th>
                                                        <th scope="col">Subject Name</th>
                                                        <th scope="col">Subject Code</th>
                                                        <th scope="col">Attendance</th>
                                                        <th scope="col">Credit</th>
                                                        <th scope="col">Grade</th>
                                                        <th scope="col">CGPA</th>
                                                        <th scope="col">Result</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.semFailList.data.map((value, index2) => {
                                                        return (
                                                            <tr>
                                                                <th scope="row">{index2 + 1}</th>
                                                                <td>{value.roll}</td>
                                                                <td>{value.name}</td>
                                                                <td>{value.subjName}</td>
                                                                <td>{value.code}</td>
                                                                <td>{value.attendance}</td>
                                                                <td>{value.credit}</td>
                                                                <td>{value.grade}</td>
                                                                <td>{value.cgpa}</td>
                                                                <td>{value.result ? 
                                                                        <button type='button' className='btn btn-danger mx-2' >FAIL</button> 
                                                                        : 
                                                                        <button type='button' className='btn btn-success mx-2' >PASS</button>
                                                                    }
                                                                    </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : "Loading Data"
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="featuredItem fail"  data-bs-toggle="modal" data-bs-target="#editModel">
                <span className="featuredTitle">No of Students Failed</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{failCount()}</span>
                    {/* <span className="featuredMoneyRate"> +2.4  
                <ArrowUpward className='featuredIcon'/></span> */}
                </div>
                <span className="featuredSb">
                    Students Failed
                </span>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    semVisData: state.auth.semVisData,
    semFailList: state.auth.semFailList,
});

export default connect(mapStateToProps)(FeaturedInfo);

