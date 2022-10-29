import React ,{useState}from 'react';
// import "./student.css";
import {  connect } from "react-redux";
import {fetchdatafun2} from "../../actions/visua";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddBranch from './AddBranch';
import AddReg from './AddReg';
import AddBatch from './AddBatch';



const AddDataMainPage = ({fetchdatafun2}) => {


    const [formData, setFormData] = useState({
        key:'',
    });
    const [ver,setver] = useState(false);
    

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const {key} = formData;

    const onSubmit = (event) =>{
        event.preventDefault();     
        console.log(key);   
        if (key === "onlyadmins"){
            console.log("inside");
            setver(true);
        }else{
            setver(false);
        }
    }

    const tabs = () =>{
        return <>
                <div className="h-100 mt-5 mx-3 border border-2 p-3 rounded-3">
                    <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="home" title="Branch">
                                <AddBranch/>
                            </Tab>
                            <Tab eventKey="profile" title="Regulation">
                                <AddReg/>
                            </Tab>
                            <Tab eventKey="contact" title="Batch">
                                <AddBatch />
                            </Tab>
                    </Tabs>
                </div>
        </>
                
    }



  return (
            <div className='home'>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center">
                        <div className="card w-100 bg-white p-4 my-2">
                            <div className="text-center my-2">
                                <h3 className='card-title'>Add Data Page</h3>
                            </div>

                            <div className="mt-4 mx-4 d-flex justify-content-center">
                                <form class="row g-3" onSubmit={(e) => onSubmit(e)} >
                                    <div class="col-auto">
                                        <input type="password" class="form-control" onChange={(e) => onChange(e)}  name="key"  disabled={ver} placeholder="Enter Secret Key"/>
                                    </div>
                                    <div class="col-auto">
                                        <button type="submit" class={ver ? "btn btn-success mb-3 px-5" : "btn btn-success mb-3 px-5 "}  disabled={ver}>{ver? "Verfied" : "Verify"}</button>
                                    </div>
                                </form>
                            </div>

                            {ver ? tabs() : ""}
                            
                        </div>
                    </div>
                </div>
            </div>
        )
}



const mapStateToProps = state => ({
    fetchdata1: state.auth.fetchdata1,
});

export default connect(mapStateToProps,{fetchdatafun2})(AddDataMainPage);

// export default StudentMainPage;

