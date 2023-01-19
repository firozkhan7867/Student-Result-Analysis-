import React from 'react';
// import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';
import { CCard, CCardBody} from '@coreui/react';
import { connect } from 'react-redux';


const Grade_all_sem = ({studentdetails}) => {
    const arr_key = () => {
      if (studentdetails.grades) {
        const data = new Map(Object.entries(studentdetails.grades));
        return Array.from(data.keys());
      }
      else {
        return [0, 0, 0, 0, 0];
      }
    }
  
    const arry_val = () => {
      if (studentdetails.grades) {
        const data = new Map(Object.entries(studentdetails.grades));
        return Array.from(data.values());
      }
      else {
        return [0, 0, 0, 0, 0];
      }
    }

    const state = {
      series: arry_val(),
      options: {
        chart: {
          width: '100%',
          type: 'pie',
          height: 20,
        },
        labels: arr_key(),
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
    }

    return (

      <CCard>
        <CCardBody>
          <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="pie" height={350} />
          </div>
        </CCardBody>
      </CCard>



    );
}



const mapStateToProps = state => ({
  studentdetails: state.auth.studentdetails
});

export default connect(mapStateToProps,null)(Grade_all_sem);