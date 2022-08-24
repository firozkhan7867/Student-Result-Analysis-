import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

import { CCard, CCardBody, CCardHeader} from '@coreui/react';


class Grade_all_sem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [25, 15, 44, 55, 41, 17],
        options: {
          chart: {
            width: '100%',
            type: 'pie',
            height:20,
          },
          labels: ["O","A","B","C","D","F"],
          theme: {
            monochrome: {
              enabled: true
            }
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -5
              }
            }
          },
          title: {
            text: "Grade analysis over all semesters",
            align: 'center'
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex]
              return [name, val.toFixed(1) + '%']
            }
          },
          legend: {
            show: false
          }
        },
      
      
      };
    }

  

    render() {
      return (
        

        <CCard>
        <CCardBody>
      <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="pie" height={350} />
</div>
</CCardBody>
</CCard>



      );
    }
  }

export default Grade_all_sem;