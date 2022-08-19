import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

class SemWisePerformanceAnalysis extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
            name: "CGPA ",
            data: [10,9.6,9.7,9.1,9.9,9.6,9.1,9.2]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight',
            
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
          },
          yaxis:{
            title: {
                text: 'CGPA for each sem'
              }
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>


      );
    }
  }

  export default SemWisePerformanceAnalysis;

