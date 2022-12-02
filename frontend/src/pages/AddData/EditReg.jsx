import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editRegulation, deleteRegulation } from "../../actions/visua";

const EditReg = ({ adminData, deleteRegulation, editRegulation, adminDltResponse, adminEditResponse }) => {

    const regs = adminData.data.reg;
    const [delData, setdelData] = useState({
        id: "",
        name: "",
        year: "",
        grades: ""
    })

    // const {id,name,year,grades} = delData;
    const [formdata, setFormData] = useState({
        name: "",
        year: "",
    });

    const { name, year } = formdata;

    const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value });

    const [err, seterr] = useState({
        del: false,
        msg: ""
    });

    let history = useNavigate();


    const edit = (value) => {
        setdelData(value);
        // console.log(value);
        setInputList(value.grades);
        setFormData({
            name: value.name,
            year: value.year,
        })
        // setFormData({name:value.name});
    }

    const delte = () => {
        const data = new FormData();
        data.append('reg', delData.id);
        // console.log(delData)
        deleteRegulation(data).then(
            () => {
                if (adminDltResponse.reg.del === "error") {
                    seterr(adminDltResponse.reg);
                }
                else if (adminDltResponse.reg.del === "success") {
                    history("/");
                }
            }
        );
    }

    const editConfirm = () => {
        const data = new FormData();
        data.append('id', delData.id);
        data.append('name', name);
        data.append('year', year);
        data.append('grade', JSON.stringify(inputList));
        editRegulation(data).then(
            () => {
                if (adminEditResponse.reg.del === "error") {
                    seterr(adminEditResponse.reg);
                } else if (adminEditResponse.reg.del === "success") {
                    history("/");
                }
            }
        )
        // console.log(name);
    }

    const delfun = (value) => {
        setdelData(value);
    }


    const [inputList, setInputList] = useState([{ grade: "", value: "" }]);

    // const onChange = e => setFormData({ ...formdata, [e.target.name]: e.target.value});


    // // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { grade: "", value: "" }]);
    };
    var payload = {};
    const onSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        // let gg = {data:inputList};
        // console.log(gg);
        data.append('reg', name);
        data.append('year', year);
        data.append('grade', JSON.stringify(inputList));

        // postAddReg(data).then((res)=>{
        //     console.log("[AddReg]"+JSON.stringify(JSON.parse(localStorage.getItem("addreg"))));
        //     console.log("[AddReg]"+JSON.parse(localStorage.getItem("addreg")).code);
        //     payload=JSON.parse(localStorage.getItem("addreg"));

        //     // if(JSON.parse(localStorage.getItem("addbrach")).msg === "Error"){
        //     setAlert(<Alert type={payload.msg.toLowerCase()} msg={payload.message.toLowerCase()} bb={payload.code} onclick={setAlert} />)

        // }).catch( (err) =>{

        //     console.log(err);
        // }
        // );
        // console.log(b)
    }


    return (
        <div className="d-flex justify-content-center">
            <div className='text-center my-5 w-100' >
                <p className='fw-bolder fs-2 mt-2'>Edit  Reg Details</p>
                <div className=" d-flex justify-content-center w-100 text-center mb-4">
                    {err.del === "error" ?
                        <div class="alert alert-warning alert-dismissible d-flex align-items-center fade w-75 show" role="alert">
                            <strong>Alert  ..!</strong>
                            {err.msg}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        : ""
                    }
                    <div class="alert alert-danger d-flex align-items-center w-75" role="alert">
                        <div>
                            <h4 class="alert-heading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>Warning!</h4>
                            <p>Deleting any of these important data will cause permanent loss of all the data,
                                Once deleted cannot be undone so please be carefull and think before Deleting any of the Branches from the list.
                                All the Branch related data will get deleted.</p>
                            <hr />
                            <p class="mb-0">Deleted Data cannot be recovered....!!. Please confirm before deleting</p>
                        </div>

                    </div>
                </div>

                {/* DELETE MODAL */}

                <div class="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Please Confirm before Deleting</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-muted">
                                <span className='fs-5 fw-bold'>{delData.name} </span> Regulation will get permamnently deleted and all the data related to this {delData.name} Regulation
                                along with students and all batches will get deleted. Are you Sure?
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
                    <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editModelLabel">Edit Branch</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form className='text-center my-2' >
                                    <div className="w-100 d-flex justify-content-center">
                                        <div className="">
                                            <input type="text" name="name" required placeholder='Regulation Name' onChange={(e) => onChange(e)} value={name} className='form-control my-3' />
                                            <input type="text" name="year" required placeholder='year' onChange={(e) => onChange(e)} value={year} className='form-control mb-4' />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <div className="">

                                            {inputList.map((x, i) => {
                                                return (
                                                    <div key={i}>



                                                        <div className="my-2 w-100 px-2 d-flex justify-content-center ">
                                                            <div className="d-flex justify-content-center w-75">
                                                                <div className="d-flex w-60 grades pl-4">
                                                                    <input type="text" required placeholder={x.grade ? x.grade : "Grade"} value={x.grade} className='rounded-start grade1' name="grade" onChange={e => handleInputChange(e, i)} />
                                                                    <input type="text" required placeholder={x.value ? x.value : "value"} value={x.value} name="value" className=' rounded-end grade1' onChange={e => handleInputChange(e, i)} />
                                                                </div>

                                                                <div className="mx-2">
                                                                    {inputList.length !== 1 && <button className='btn btn-danger' onClick={() => handleRemoveClick(i)}>Delete</button>}
                                                                </div>
                                                                <div className="mx-2 ">
                                                                    {inputList.length - 1 === i && <button className='btn btn-primary ' onClick={handleAddClick}>Add</button>}
                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                );
                                            })}
                                        </div>
                                    </div>
                                </form>

                                <button type="button" class="btn btn-primary mx-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={() => editConfirm()}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDIT MODAL */}

                {/* <div className="d-flex justify-content-around">
                        <div className=""></div>
                    </div> */}
                <div className="d-flex justify-content-center">
                    <table className="table table-hover" style={{ width: "85%" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Year</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {regs.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{value.name}</td>
                                        <td>{value.year}</td>
                                        <td className='d-flex justify-content-center'>
                                            <button className='btn btn-success mx-2' data-bs-toggle="modal" onClick={() => edit(value)} data-bs-target="#editModel">EDIT</button>
                                            <button className='btn btn-danger' data-bs-toggle="modal" onClick={() => delfun(value)} data-bs-target="#exampleModal">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    adminData: state.auth.adminData,
    adminDltResponse: state.auth.adminDltResponse,
    adminEditResponse: state.auth.adminEditResponse,
});


export default connect(mapStateToProps, { deleteRegulation, editRegulation })(EditReg);