import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import ReactApexChart from 'react-apexcharts';
import { connect } from "react-redux";
import {getStudentDetails} from "../../actions/visua";


const SemWisePerformanceAnalysis = ({getStudentDetails,studentdetails}) => {

	const options = {
		chart: {
			height: 350,
			type: 'line',
			zoom: {
				enabled: true,
				autoScaleYaxis: true, 
			}
		},
		marker:{
			size: 5,
			strokeWidth: 2,
			shape:"circle",

		},
		dataLabels: {
			enabled: true
		},
		stroke: {
			curve: 'smooth',
			lineCap: 'butt',

		},
		title: {
			text: 'Semester wise performance analysis',
			align: 'center'
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
				opacity: 0.5
			},
		},
		xaxis: {
			categories: ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6', 'Sem7', 'Sem8'],
			tickPlacement: 'on'
		},
		yaxis: {
			title: {
				text: 'CGPA for each sem'
			},
			min:5.8,
			max:10
		}
	}

	const series =  [{name: "CGPA ", data: studentdetails.cgpas}];

	return (
		<CCard>
			<CCardBody>
				<div id="chart">
					<ReactApexChart options={options} series={series} type="line" height={350} />
				</div>
			</CCardBody>
		</CCard>
	);
}




const mapStateToProps = state => ({
    studentdetails: state.auth.studentdetails
});

export default connect(mapStateToProps,{getStudentDetails})(SemWisePerformanceAnalysis);

