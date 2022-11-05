import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { connect } from 'react-redux';

class SemWiseBacklogAnalysis extends React.Component {
	constructor(props) {
		super(props);

		console.log(this.props.semWiseBacklogData);

		this.state = {

			series: [{
				name: 'Total backlogs in each sem',
				data: this.props.semWiseBacklogData.allBacklogs,
			}, {
				name: 'Number of backlogs cleared',
				data: this.props.semWiseBacklogData.clearedBacklogs,
			},],
			options: {
				chart: {
					type: 'bar',
					height: 20
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded'
					},
				},
				title: {
					text: 'Sem wise Backlog analysis',
					align: 'center'
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				xaxis: {
					categories: ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6', 'Sem7', 'Sem8'],
				},
				yaxis: {
					title: {
						text: 'Total number of subjects in each sem'
					}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return val
						}
					}
				}
			},


		};
	}
	render() {
		return (
			<CCard>
				<CCardBody>
					<div id="chart">
						<ReactApexChart options={this.state.options} series={[{
				name: 'Total backlogs in each sem',
				data: this.props.semWiseBacklogData.allBacklogs,
			}, {
				name: 'Number of backlogs cleared',
				data: this.props.semWiseBacklogData.clearedBacklogs,
			},]} type="bar" height={350} />
					</div>
				</CCardBody>
			</CCard>
		);
	}
}

const mapStateToProps = state => ({
    semWiseBacklogData: state.auth.semWiseBacklogData,
});

export default connect(mapStateToProps,null)(SemWiseBacklogAnalysis);