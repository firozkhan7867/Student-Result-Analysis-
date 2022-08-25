import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader} from '@coreui/react';

class PieChartSecWiseFail extends React.Component {
    constructor(props) {
      super(props);

      const getData = JSON.parse(localStorage.getItem("subjSectAnalysis"));
      // console.log(getData);
      const data = getData.failPercentageSection;
      // console.log(data);

      this.state = {
      
        series: data,
        options: {
          chart: {
            width: 420,
            type: 'donut',
          },
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
            formatter: function(val, opts) {
              return 'section '+ (opts.seriesIndex+1) + " - " + opts.w.globals.series[opts.seriesIndex]
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
    }


  

    render() {
      return (
        <CCard>
        <CCardBody>
      <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={460} height={300}/>
              </div>
      </CCardBody>
      </CCard>

      );
    }
  }

//   const domContainer = document.querySelector('#app');
//   ReactDOM.render(React.createElement(PieChartSecWiseFail), domContainer);
export default PieChartSecWiseFail;