import React ,{useState}from 'react';
// import "./student.css";
import {  connect } from "react-redux";
import {fetchdatafun2} from "../../actions/visua";
import { Link } from 'react-router-dom';



const AddDataMainPage = ({fetchdatafun2,pagestoShow,tog,sidebar,pp}) => {


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
        if (key === "onlyadmins"){
            setver(true);
        }else{
            setver(false);
        }
    }

    const tabs = () =>{
        return <>
                <div className="h-100 mx-3">
                    {/* <Tabs
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
                    </Tabs> */}
                    {pagestoShow}
                    
                </div>
        </>
                
    }

    
    const tt = ()=>{
        tog(!sidebar);
    }

    const secret = () =>{
        return <>
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
                </>
    }



  return (
            <div className='home main-container mh-100'>
                <div className="mx-3 mt-2 d-flex justify-content-between">
                    <div className="" onClick={() => tt()}>
                        <button   class="navbar-toggler navbar-light bg-light px-2 py-1 rounded" type="button">
                            <span class="navbar-toggler-icon"></span>
                        </button> <span className='fw-light text-secondary mx-2'>Toggle Side bar</span>
                    </div>
                    <div className="mx-3 ">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to={"/"}>Admin</Link></li>
                            <li class="breadcrumb-item active" aria-current="page">{pp}</li>
                        </ol>
                    </div>
                </div>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center">
                        <div className="card w-100 bg-white my-2">

                            {ver? "":secret()}
                            

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

