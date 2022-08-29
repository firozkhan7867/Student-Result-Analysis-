import React, {Component} from 'react';
import PieChart from "./PieChart";
import Bargraph from "./Bargraph"
import "./featuredinfo.css"
import Table from './Table';
// import WidgetLg from '../TopperData/ToppersData';
// import SecWisePerfamanceChart from '../SecWisePerfamanceChart/SecWisePerfamanceChart';
import PieChartSecWiseFail from './PieChartSecWiseFail';
import ToppersData from '../TopperData/ToppersData';
import ErrorBoundary from '../../pages/error/ErrorBoundary';
const Combo = (props) => {
    
    return (
        <div className="">
            <div className="featured">
                {/* <ErrorBoundary>
                    <PieChartSecWiseFail/>
                </ErrorBoundary> */}
                <div className="featuredItem">
                    <h5 className='d-flex justify-content-center'>Section Wise analysis of failure data</h5>
                    <br/>
                    <div className="mx-4">
                        <ErrorBoundary>
                            <PieChartSecWiseFail/>
                        </ErrorBoundary>
                    </div>
                </div>
                <div className="featuredItem ">
                    <h5>BackLog Details and Count</h5>
                    <br />
                    {/* <br /><br /><br /><br /><br /> */}
                    <ErrorBoundary>
                        <Bargraph back_data={props.back_data} />
                    </ErrorBoundary>
                    {/* <Bargraph  /> */}
                </div>
                
            </div>
            <div className='featured'>
                <div className="featuredItem ">
                    <h5>Grade Analysis</h5>
                    <br />
                    <ErrorBoundary>
                        <PieChart cgpa_data={props.cgpa_data}/>
                    </ErrorBoundary>
                    
                </div>
                <div className="featuredItem">
                    <h5 className='d-flex justify-content-center'>Topper's Data of each Section</h5>
                    <hr />
                        <br />

                    <div className="mx-4">
                        <ErrorBoundary>
                            <ToppersData/>
                        </ErrorBoundary>
                    </div>
                </div>
                
            </div>
            {/* <div className='featured'>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
            </div>
            <div className='featured'>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
                <div className="featuredItem ">
                    <h2>Grade Analysis</h2>
                    <br />
                    <PieChart cgpa_data={props.cgpa_data} />
                </div>
            </div> */}
            

            

            <div className="featured">
                <div className="featuredItem">
                    <h5 className='d-flex justify-content-center'>Section Wise Subject Analysis</h5>
                    <hr />
                        <br />
                    <Table />
                </div>
            </div>

            {/* <div className="featured">
                <div className="featuredItem">
                    <h1 className='d-flex justify-content-center'>Section Wise Subject Analysis</h1>
                    <hr />
                        <br />
                        <SecWisePerfamanceChart/>
                </div>
            </div> */}

        </div>
    )
}


export default Combo;
