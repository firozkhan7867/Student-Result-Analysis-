import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody, CCardHeader} from '@coreui/react';
import { connect } from "react-redux";

class PieChartSecWiseFail extends React.Component {
    constructor(props) {
      super(props);

      const getData = JSON.parse(localStorage.getItem("subjSectAnalysis"));
      // console.log(this.props.failPercentageSection);
      // // const data = getData.failPercentageSection;
      const data = this.props.failPercentageSection;
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
      // console.log(this.props.failPercentageSection);
      return (
        <CCard>
        <CCardBody>
      <div id="chart">
              <ReactApexChart options={this.state.options} series={this.props.failPercentageSection} type="donut" width={460} height={300}/>
              </div>
      </CCardBody>
      </CCard>

      );
    }
  }



  function mapStateToProps(state) {
    const failPercentageSection = state.auth.failPercentageSection;
    return {
      failPercentageSection
    };
  }
  
export default connect(mapStateToProps)(PieChartSecWiseFail)