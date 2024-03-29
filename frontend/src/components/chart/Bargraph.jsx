import React, { Component } from 'react'
import { CCard, CCardBody,   CCardHeader } from '@coreui/react'
import { CChartBar } from '@coreui/react-chartjs'
import "./featuredinfo.css"

class Bargraph extends Component {

    arr_key= () =>{
      // console.log( typeof(this.props.back_data));
      if (this.props.back_data){
        const data = new Map(Object.entries(this.props.back_data));
        return Array.from( data.keys() );
      }
      else{
        return [1,1,1,1,1];
      }
    }

    arry_val = () => {
      if (this.props.back_data){
      const data = new Map(Object.entries(this.props.back_data));
      return Array.from( data.values() );
    }
      
    else{
      return [0,0,0,0,0];
    }
    }


    // https://stackoverflow.com/questions/68911251/coreui-chart-type-bar-clickable-bars-to-link-to-another-page
    render() {
        return (
        <CCard className="h">
          <CCardBody className='body'>
            <CChartBar className='graph'
              data={{
                responsive: true,
                labels: this.arr_key(),
                datasets: [
                  {
                    // data: this.arry_val(),
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#41B883',
                      '#E46651',
                      '#00D8FF',
                    ],
                    hoverBackgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#41B883',
                      '#E46651',
                      '#00D8FF',
                    ],
                    data: this.arry_val(),
                    label: 'Backlog Counts',
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
        )
    }
}


export default Bargraph;