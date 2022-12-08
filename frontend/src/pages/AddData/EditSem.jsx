import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchdatafun2, fetchdatafun3, postFilterData } from "../../actions/visua";
import 'react-toastify/dist/ReactToastify.css';

const EditSem = ({ adminData, fetchdata1, fetchdata2, fetchdata3, filteredData, fetchdatafun2, fetchdatafun3, postFilterData }) => {


    console.log(fetchdata1);

    const branchData = adminData.data.branch;
    const regData = adminData.data.reg;
    const batchData = fetchdata2["batch"];
    const sectData = fetchdata3["section"];
    const semData = fetchdata3["sems"];
    const regs = adminData.data.reg;



    const [showTable, setshowTable] = useState(false);



    const [formData, setFormData] = useState({
        branch: '',
        reg: '',
        batch: '',
        sems: '',
        cgpa: '',
        backlog: '',
        sect: '',
    });


    const [alert, setAlert] = useState('');
    const { branch, reg, batch, sems, cgpa, backlog, sect } = formData;


    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onChangeReg = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        fetchdatafun2(e.target.value);
    }

    const onChangeBatch = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // console.log(branch,reg,batch);
        // console.log(e.target.value,e.target.name);
        fetchdatafun3(branch, reg, e.target.value);
        // console.log(branchData,regData,batchData);
    }

    const onChangeMul = e => {
        let sems = Array.from(e.target.selectedOptions, option => option.value);
        // console.log(sems);
        // console.log(e.target.selectedOptions);
        setFormData({ ...formData, [e.target.name]: sems });
    }


    const onSubmit = (event) => {
        event.preventDefault();

        // console.log(branch,reg,batch,sems,cgpa,backlog,sectData);

        // setshowTable(true);

        const data = new FormData();
        data.append('reg', reg);
        data.append('branch', branch);
        data.append('batch', batch);
        data.append('sems', sems);
        data.append('cgpa', cgpa);
        data.append('backlog', backlog);
        data.append('sect', sect);

        console.log(reg, branch, batch, sems, cgpa, backlog, sect)
        postFilterData(data).then(() => {

            setshowTable(true)
        }
        )

    }







    const [delData, setdelData] = useState({
        id: "",
        name: "",
        reg: "",
        branch: "",
        batch: "",
    });

    const [view, setView] = useState({
        id: "",
        name: "",
    })
    const { id, name } = view;

    const [err, seterr] = useState({
        del: false,
        msg: ""
    });

    // let history = useNavigate();


    const edit = (value) => {
        setdelData(value);
        setFormData({ name: value.name, reg: value.reg });
    }

    const delte = () => {
        const data = new FormData();
        data.append('batch', delData.id);
        // deleteBatch(data).then(
        //     () => {
        //         if (adminDltResponse.batch.del === "error") {
        //             seterr(adminDltResponse.batch);
        //         }
        //         else if (adminDltResponse.batch.del === "success") {
        //             history("/");
        //         }
        //     }
        // );
    }

    const editConfirm = () => {
        const data = new FormData();
        data.append('id', delData.id);
        data.append('name', name);
        data.append('reg', reg);
        // editBatch(data).then(
        //     () => {
        //         if (adminEditResponse.batch.del === "error") {
        //             seterr(adminEditResponse.batch);
        //         } else if (adminEditResponse.batch.del === "success") {
        //             history("/");
        //         }
        //     }
        // )
    }

    const delfun = (value) => {
        setdelData(value);
    }



    return (
        <div className='h-100'>
            <div className="">
                <form className='text-center my-5' onSubmit={(e) => onSubmit(e)} >
                    <p className='fw-bolder fs-2 my-2'>EDIT SEMESTER</p>

                    {/* DELETE MODAL */}

                    <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered ">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Please Confirm before Deleting</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body text-muted">
                                    <span className='fs-5 fw-bold'> {delData.name}</span> Semester will get permamnently deleted and all the data related to this {delData.name}  Semester
                                     will get deleted. Are you Sure?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => delte()}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* DELETE MODAL */}

                    {/* EDIT MODAL */}
                    <div class="modal fade" id="editModel" aria-labelledby="editModelLabel" aria-hidden="true">
                        <div class="modal-dialog  modal-dialog-scrollable modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editModelLabel">View Semester Details</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>

                                        <label for="recipient-name" class="col-form-label">Semester Details :</label>
                                        <div class="mb-3 d-flex justify-content-center">
                                            <div className="">
                                                hi
                                            </div>
                                        </div>
                                    </form>

                                    <button type="button" class="btn btn-primary mx-2" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => editConfirm()}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* END EDIT MODAL */}


                    <div className=" w-100 my-4 text-center">
                        <form onSubmit={onSubmit}>
                            <div className="mx-4">
                                <div className="d-flex align-items-center justify-content-center w-100 mx-4 my-4">
                                    <div className="w-50 d-flex align-items-center">
                                        <h5 >Branch: </h5>
                                        <select name="branch" className="form-control mx-2 w-75" value={branch} onChange={e => onChange(e)} required>
                                            <option value="-">Select</option>
                                            {branchData ?
                                                branchData.map((value, index) => {
                                                    return <option value={value.id} key={index}>{value.name}</option>
                                                })
                                                :
                                                <option value="-">No Data Available</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center w-100 mx-4 my-4">
                                    <div className="w-50 d-flex align-items-center">
                                        <h5 >Regulation: </h5>
                                        <select name="reg" className="form-control mx-2 w-75" value={reg} onChange={e => onChangeReg(e)} required>
                                            <option value="-">Select</option>
                                            {regData ?
                                                regData.map((value, index) => {
                                                    return <option value={value.id} key={index}>{value.name}</option>
                                                })
                                                :
                                                <option value="-">No Data Available</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center w-100 mx-4 my-4">
                                    <div className="w-50 d-flex align-items-center">
                                        <h5 >Batch: </h5>
                                        <select name="batch" className="form-control mx-2 w-75" value={batch} onChange={e => onChangeBatch(e)} required>
                                            <option value="-">Select</option>
                                            {batchData ?
                                                batchData.map((value, index) => {
                                                    return <option value={value.id} key={index}>{value.name}</option>
                                                })
                                                :
                                                <option value="-">No Data Available</option>
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 mx-5 text fs-4 fw-bolder">
                                List of semester Available in the above Batch details Selected
                            </div>
                            <div className="d-flex justify-content-center">
                                <table className="table table-hover" style={{ width: "85%" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Semesters Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {semData ?
                                            semData.map((value, index) => {
                                                return (

                                                    <tr key={index}>
                                                        {value.id !== "all" ?
                                                            <>
                                                                <th scope="row">{index}</th>
                                                                <td>{value.name} - Semester</td>
                                                                <td className='d-flex justify-content-center'>
                                                                    <button type='button' className='btn btn-primary mx-2' onClick={() => edit(value)} data-bs-toggle="modal" data-bs-target="#editModel">View</button>
                                                                    <button type='button' className='btn btn-danger' onClick={() => delfun(value)} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                                                                </td>
                                                            </>
                                                            :
                                                            ""
                                                        }

                                                    </tr>
                                                )
                                            })
                                            : ""
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>


                </form>
            </div>
            {/* <ToastContainer/> */}
        </div>
    )

}

const mapStateToProps = state => ({
    adminData: state.auth.adminData,
    fetchdata2: state.auth.fetchdata2,
    fetchdata3: state.auth.fetchdata3,
    filteredData: state.auth.filteredData,
});



export default connect(mapStateToProps, { fetchdatafun2, fetchdatafun3, postFilterData })(EditSem);
