import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader} from '@coreui/react';

class SemWiseBacklogAnalysis extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [{
          name: 'Total backlogs in each sem',
          data: [10,5,8,2,9,11,9,9]
        }, {
          name: 'Number of backlogs cleared',
          data: [2,3,4,1,4,1,4,4]
        }, ],
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
                return  val 
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
<ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
</div>
</CCardBody>
</CCard>


      );
    }
  }

export default SemWiseBacklogAnalysis;