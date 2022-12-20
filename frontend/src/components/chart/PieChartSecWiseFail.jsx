import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { connect } from "react-redux";

const PieChartSecWiseFail =(props) => {
	
		const data = props.failPercentageSection;
		// console.log(data);

		const state = {
			series: data,
			options: {
				chart: {
					width: 420,
					type: 'donut',
					events: {
						dataPointSelection: function(event, chartContext, config) {
							// console.log(event);
							// console.log(chartContext);
							console.log(config.dataPointIndex);
						  // The last parameter config contains additional information like `seriesIndex` and `dataPointIndex` for cartesian charts
						}
					  },
				},
				// onClick: (evt, activeEls) => {
				// 	console.log(activeEls[0]._model.label);
				// 	console.log("hi");
				// 	console.log(activeEls);
				// 	console.log(activeEls[0]._model.label.split(" ")[0]);
				// },
				
				plotOptions: {
					pie: {
						startAngle: -90,
						endAngle: 270
					}
				},
				dataLabels: {
					enabled: false
				},
				fill: {
					type: 'gradient',
				},
				legend: {
					formatter: function (val, opts) {
						return 'section ' + (opts.seriesIndex + 1) + " - " + opts.w.globals.series[opts.seriesIndex]
					}
				},
				title: {
					text: ''
				},
				responsive: [{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: 'bottom'
						}
					}
				}]
			},


		};




		// console.log(this.props.failPercentageSection);
		return (
			<CCard>
				<CCardBody>
					<div id="chart">
						<ReactApexChart options={state.options} series={props.failPercentageSection} type="donut" width={460} height={300} />
					</div>
				</CCardBody>
			</CCard>

		);
	}



function mapStateToProps(state) {
	const failPercentageSection = state.auth.failPercentageSection;
	return {
		failPercentageSection
	};
}

export default connect(mapStateToProps)(PieChartSecWiseFail)