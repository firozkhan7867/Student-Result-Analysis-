import React, { Component } from "react";
import Selected, { Select } from '../../components/FetchSelectCompos/select';

// import "./student.css";
// styled components
//

class FetchMainPage extends Component {
    state = {
        source: {
            branch: [
                {
                    id: 1,
                    name: "CSE"
                },
                {
                    id: 2,
                    name: "ECE"
                },
                {
                    id: 3,
                    name: "MECH"
                }
            ],
            reg: [
                {
                    id: 1,
                    name: "R-16",
                    branch: 1
                },
                {
                    id: 2,
                    name: "R-17",
                    branch: 1
                },
                {
                    id: 3,
                    name: "R-18",
                    branch: 1
                },
                {
                    id: 4,
                    name: "R-19",
                    branch: 1
                },
                {
                    id: 5,
                    name: "R-20",
                    branch: 1
                },
                {
                    id: 1,
                    name: "R-16",
                    branch: 2
                },
                {
                    id: 2,
                    name: "R-17",
                    branch: 2
                },
                {
                    id: 3,
                    name: "R-18",
                    branch: 2
                },
                {
                    id: 4,
                    name: "R-19",
                    branch: 2
                },
                {
                    id: 5,
                    name: "R-20",
                    branch: 2
                },
                {
                    id: 1,
                    name: "R-16",
                    branch: 3
                },
                {
                    id: 2,
                    name: "R-17",
                    branch: 3
                },
                {
                    id: 3,
                    name: "R-18",
                    branch: 3
                },
                {
                    id: 4,
                    name: "R-19",
                    branch: 3
                },
                {
                    id: 5,
                    name: "R-20",
                    branch: 3
                }
            ],
            batch: [
                {
                    id: 1,
                    name: "2016-2020",
                    reg: 1
                },
                {
                    id: 2,
                    name: "2017-2021",
                    reg: 2
                },
                {
                    id: 3,
                    name: "2018-2022",
                    reg: 3
                },
                {
                    id: 4,
                    name: "2019-2023",
                    reg: 3
                },
                {
                    id: 5,
                    name: "2020-2024",
                    reg: 4
                }
            ],
            sem: [
                {
                    id: 1,
                    name: "I Semester",
                    batch: 1
                },
                {
                    id: 2,
                    name: "II Semester",
                    batch: 1
                },
                {
                    id: 3,
                    name: "III Semester",
                    batch: 1
                },
                {
                    id: 4,
                    name: "IV Semester",
                    batch: 1
                },
                {
                    id: 5,
                    name: "V Semester",
                    batch: 2
                },
                {
                    id: 6,
                    name: "VI Semester",
                    batch: 2
                },
                {
                    id: 7,
                    name: "VII Semester",
                    batch: 2
                },
                {
                    id: 8,
                    name: "VIII Semester",
                    batch: 3
                }
            ]
        },

        branch: [],
        reg: [],
        batch: [],
        sem: [],

        sourceMap: {
            branch: 0,
            reg: 1,
            batch: 2,
            sem: 3
        }
    };

    componentDidMount = () => {
        const { branch } = this.state.source;
        this.setState({
            branch
        });
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
        const { branch, reg, batch, sem } = this.state;
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
                                            <Selected
                                                data={branch}
                                                action={this.handleChange}
                                                current="branch"
                                                next="reg"
                                            />
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
                                            <Selected data={sem} />
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
        );
    }
}

export default FetchMainPage;
