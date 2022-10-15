import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Selected, { Select } from '../../components/FetchSelectCompos/select';




class FetchMainPage extends Component {
    constructor(props){ 
        super(props) 

    // console.log(this.props.regData);
    // console.log(this.props);

    this.state = {
        source: {
            reg: JSON.parse(localStorage.getItem('regulationData')).regData,
            batch:JSON.parse(localStorage.getItem('regulationData')).batchData,
            // reg:this.props.regData.regData,
            // batch:this.props.regData.batchData,
            sem: []
        },
        reg: [],
        batch: [],
        sem: [],

        regs:"",
        batchs:"",
        sems:"",
        branchs:"",
        alert:"",
        

        sourceMap: {
            reg: 0,
            batch: 1,
            sem: 2
        }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state);
        this.props.postRegulationData(this.state.branchs,this.state.batchs,this.state.sems).then(()=>{
            
            // console.log(JSON.parse(localStorage.getItem('checkFetchSem')));
            this.setState({
                ["alert"]:<div className={`alert alert-${JSON.parse(localStorage.getItem("checkFetchSem")).code} alert-dismissible fade show d-flex justify-content-between`} role="alert">
                            <div className="">
                                <strong>{JSON.parse(localStorage.getItem("checkFetchSem")).code} ..!!!</strong> {JSON.parse(localStorage.getItem("checkFetchSem")).msg}
                             </div>
                             <NavLink to={"/"} type="button" className="rounded p-2 bg-danger text-white close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </NavLink>
                         </div>
            })

            if (JSON.parse(localStorage.getItem("checkFetchSem")).code === "success"){
                this.props.postFetchData(this.state.branchs,this.state.batchs,this.state.sems);
            }
            // setTimeout(,5000);
            
        });
        
      }
    
    handleInputChange2 = (name,value)=> {
        // event.preventDefault();

        // console.log(e.target.name);
        // const target = event.target;
        this.setState({
            [name]: value,
        });

        // console.log(this.state);
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
          [target.name]: target.value,
        });
      }
    
    componentDidMount = () => {
        // console.log("inside component")
        // this.props.fetchRegulationData().then(() =>
        //     this.setState({
        //         ["source"]:{
        //             ["reg"]:this.props.regData.regData,
        //             ["batch"]:this.props.regData.batchData,
        //         }
        //     })
        // )
        // console.log(this.state);
        // fetch( `${process.env.REACT_APP_API_URL}/get_fetch_data`,{
        //     method: "GET",
        // }).then(resp => resp.json())
        // // .then(resp => console.log(resp))
        // .then(res => this.setdataintoDAta(res))
        // .catch(error => console.log(error))

        const { reg } = this.state.source;
        this.setState({
            reg
        });

        
        // console.log(this.props.regData);

        
        // this.setData();

        // this.setState({
        //     source:{
        //         reg:this.props.regData.regData,
        //         batch:this.props.regData.batchData,
        //     }
        // });
    };

    handleChange = params => ev => {
        const target = ev.currentTarget;
        const { value } = target;
        const { current, next,name } = params;
        this.setNewValues({ value, current, next });
        this.handleInputChange2(name,value);
        // console.log(target,value);
    };

    setNewValues = ({ value, current, next }) => {
        const { source } = this.state;
        const data = source[next];

        if (data) {
            this.setState({
                [next]: data.filter(el => el[current] === Number(value))
            });
        }

        this.clearValues(next);
    };

    clearValues = next => {
        const { sourceMap } = this.state;
        const nextkey = sourceMap[next];

        Object.entries(sourceMap)
            .filter(([_, value]) => value > nextkey)
            .forEach(([key]) => {
                this.setState({
                    [key]: []
                });
            });
    };

    onSubmit = params => e =>{
        e.preventDefault();
        console.log(this.state.sourceMap);
    }

  
    render() {
        const { reg, batch, sem,alert } = this.state;
        // console.log(this.props.regData);
        return (
            <div className='home'>
                <div className="ss h-100">
                    <div className="d-flex justify-content-center cardd">
                        <div className="card w-100 bg-white p-4">
                            <div className="text-center my-3">
                                <h3 className='card-title'>Fetch Student  Results Data Section</h3>
                                <hr style={{width:430,color:"rgb(45, 43, 43)"}}/>
                            </div>
                            <div className="w-100">
                                {this.state.alert}
                            </div>
                            <div className="d-flex justify-content-center text-center">
                                <form className='w-50'  onSubmit={this.handleSubmit}>
                                    <div className="form-group my-3 row">
                                        <label htmlFor="branch" className="col-sm-4 col-form-label">Branch</label>
                                        <div className="col-sm-8">
                                            <select name="branchs" onChange={this.handleInputChange}  className="form-control w-75" id="">
                                                <option value="">Select Value</option>
                                                <option value="CSE">CSE</option>
                                                <option value="ECE">ECE</option>
                                                <option value="EEE">EEE</option>
                                                <option value="CIVIL">CIVIL</option>
                                                <option value="IT">IT</option>
                                                <option value="MECH">MECH</option>
                                                <option value="CHEM">CHEM</option>
                                                <option value="CSD">CSD</option>
                                                <option value="CSAIML">CS-AI-ML</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group my-3 row">
                                        <label htmlFor="regulation" className="col-sm-4 col-form-label">Regulation</label>
                                        <div className="col-sm-8">
                                            <Selected
                                                data={reg}
                                                action={this.handleChange}
                                                current="reg"
                                                next="batch"
                                                name="regs"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-3 row">
                                        <label htmlFor="batch" className="col-sm-4 col-form-label">Batch</label>
                                        <div className="col-sm-8">
                                            <Selected
                                                data={batch}
                                                action={this.handleChange}
                                                current="batch"
                                                next="sem"
                                                name="batchs"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-3 row">
                                        <label htmlFor="sem" className="col-sm-4 col-form-label">Semester</label>
                                        <div className="col-sm-8">
                                            {/* <Selected data={sem} /> */}
                                            <select name="sems" onChange={this.handleInputChange} className="form-control w-75">
                                                <option value="0">Select Value</option>
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
                                    <div className="form-group my-3 row">
                                        <div className="col-sm-10 d-flex justify-content-center">
                                            {/* <Selected data={sem} /> */}
                                            <input type="checkbox" name="ok" className="col-sm-2 form-group" onChange={this.handleInputChange} />
                                            <label  className="">Are you sure to fetch ?   </label>
                                            
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type='submit' className="btn btn-primary w-50">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center mt-3">
                                <h6 className='card-subtitle card-subtitle mb-2 text-muted'>Please follow the hierarchy while selecting the dropdown menus to ensure you get the correct data</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FetchMainPage;
