import React ,{useState}from 'react';
// import "./home.css";
import "./student.css";



const FetchMainPage = ({}) => {

    const [formData, setFormData] = useState({
        branch:'',
        regulation:'',
        batch:'',
        sem:'',
    });

    const {branch,regulation, batch,sem} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        console.log(branch,regulation,batch,sem);
    }


  return (
            <div className='home'>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center ">
                        <div className="card w-100 bg-white p-4 my-5">
                            <div className="text-center my-3">
                                <h3 className='card-title'>Fetch Student  Results Data Section</h3>
                                <hr />
                            </div>
                            <div className="d-flex w-75 justify-content-center my-5 text-center">
                            <form className='w-50' onSubmit={e => onSubmit(e)}>
                                <div className="form-group my-3 row">
                                    <label for="branch" className="col-sm-4 col-form-label">Branch</label>
                                    <div className="col-sm-8">
                                        <select name="branch" onChange={e => onChange(e)} id="" className='form-control'>
                                            <option value="1">CSE</option>
                                            <option value="2">ECE</option>
                                            <option value="3">MECH</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="regulation" className="col-sm-4 col-form-label">Regulation</label>
                                    <div className="col-sm-8">
                                        <select name="regulation" onChange={e => onChange(e)} id="" className='form-control'>
                                            <option value="1">R-15</option>
                                            <option value="2">R-19</option>
                                            <option value="3">R-20</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="batch" className="col-sm-4 col-form-label">Batch</label>
                                    <div className="col-sm-8">
                                        <select name="batch" id="" onChange={e => onChange(e)} className='form-control'>
                                            <option value="1">2018-2022</option>
                                            <option value="2">2019-2023</option>
                                            <option value="3">2020-2024</option>
                                            <option value="4">2021-2025</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group my-3 row">
                                    <label for="sem" className="col-sm-4 col-form-label">Semester</label>
                                    <div className="col-sm-8">
                                        <select name="sem" id="" onChange={e => onChange(e)} className='form-control'>
                                            <option value="1">I - Semester</option>
                                            <option value="2">II - Semester</option>
                                            <option value="3">III - Semester</option>
                                            <option value="4">VI - Semester</option>
                                            <option value="5">V - Semester</option>
                                            <option value="6">VI - Semester</option>
                                            <option value="7">VII - Semester</option>
                                            <option value="8">VIII - Semester</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type='submit' className="btn btn-primary w-50">Submit</button>
                                </div>
                            </form>
                            </div>
                            <div className="text-center mt-5">
                                <h6 className='card-subtitle card-subtitle mb-2 text-muted'>Please enter the student roll number to generate Results report Analysis</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default FetchMainPage;