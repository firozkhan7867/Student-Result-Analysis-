import React ,{useState}from 'react';
// import "./home.css";
import "./student.css";



const StudentMainPage = ({}) => {

    const [formData, setFormData] = useState({
        roll:'',
    });

    const {roll} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        // console.log(roll);
    }



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
                                <form onSubmit={e => onSubmit(e)}>
                                    <div className="">
                                        <input type="text" name="roll" className='form-control my-4' onChange={e => onChange(e)} placeholder='rollnumber' />
                                        <button type='submit' className='btn btn-success text-white'>Generate</button>
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

export default StudentMainPage;

