import React, { Component } from "react";
import Selected, { Select } from '../../components/FetchSelectCompos/select';

// import "./student.css";
// styled components
//

class FetchMainPage extends Component {
    constructor(props){ 
        super(props) 

    this.state = {
        source: {
            reg: JSON.parse(localStorage.getItem('regulationData')).regData,
            batch:JSON.parse(localStorage.getItem('regulationData')).batchData,
            // reg:[],
            // batch:[],
            sem: []
        },

        reg: [],
        batch: [],
        sem: [],

        sourceMap: {
            reg: 0,
            batch: 1,
            sem: 2
        }
        };

        // this.setData = this.setData.bind(this) ;
    }


    // setData2 = () =>{
        
    //     this.props.fetchRegulationData();
    //     console.log(this.props.regData);

    //     if (this.props.regData){
    //         console.log(this.props.regData);
    //         this.setState({
    //             source:{
    //                 reg:this.props.regData.regData,
    //                 batch:this.props.regData.batchData,
    //             }
    //         })
    //     }else{
    //         this.setState({
    //             source:{
    //                 reg:[],
    //                 batch:[],
    //             }
    //         })
    //     }
    // }


    // setData = () => {
        
    //     // console.log(this.props.regData);
    //     if (this.props.regData){
    //         console.log(this.props.regData);
    //         const reg = this.props.regData.regData;
    //         const batch= this.props.regData.batchData;
    //         this.setState({
    //             reg
    //         })
    //         console.log(this.state);
    //     }else{
    //         // this.setData2();
    //         this.setState({
    //             source:{
    //                 reg:[],
    //                 batch:[],
    //             }
    //         })
    //     }
    // }

    componentDidMount = () => {
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
        const { current, next } = params;
        this.setNewValues({ value, current, next });
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


    render() {
        const { reg, batch, sem } = this.state;
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
                                <form className='w-50' >
                                    <div className="form-group my-3 row">
                                        <label htmlFor="branch" className="col-sm-4 col-form-label">Branch</label>
                                        <div className="col-sm-8">
                                            <select name="branch" onChange={this.setData} className="form-control w-75" id="">
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
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group my-3 row">
                                        <label htmlFor="sem" className="col-sm-4 col-form-label">Semester</label>
                                        <div className="col-sm-8">
                                            {/* <Selected data={sem} /> */}
                                            <select name="" className="form-control w-75">
                                                <option value="1">I - Semester</option>
                                                <option value="1">II - Semester</option>
                                                <option value="1">III - Semester</option>
                                                <option value="1">VI - Semester</option>
                                                <option value="1">V - Semester</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-primary w-50">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="text-center mt-5">
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
