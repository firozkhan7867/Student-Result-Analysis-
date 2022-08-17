import React from "react";
import "./featuredinfo.css"

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Legend,
    ValueAxis,
    Title,
    Export,
    Tooltip,
    Border
  } from "devextreme-react/chart";
  import service from "./data.js";
  // import { fetchSubjSectAnalysys } from '../../actions/visua';
  import { connect } from 'react-redux';

  
  const dataSource = service.getMaleAgeData();
  
  const SecWisePerfamanceChart= ({subjSectAnalysisdata}) => {
    const data = JSON.parse(localStorage.getItem('subjSectAnalysis'));
    // console.log(data);
    return (
      
        <Chart
          id="chart"
          
          dataSource={data.subjSectionData}
        >
          <CommonSeriesSettings argumentField="subject_name" type="stackedBar" />

          
          {/* {
            subjSectAnalysisdata.map((value,index)=>{
              return (
                <Series valueField={value.}/>
              )


            })
          } */}
          
          
          <Series
            valueField="section-1-Pass"
            name="Male: 0-14"
            stack="section-1"
            color="red"
          />
          <Series
            valueField="section-1-Fail"
            name="Male: 15-64"
            stack="section-1"
            color="green"
          />
          <Series
            valueField="section-2-Pass"
            name="Male: 65 and older"
            stack="section-2"
            color="pink"
          />
          <Series
            valueField="section-2-Fail"
            name="Female: 0-14"
            stack="section-2"
          />
  
          <Series valueField="section-3-Pass" name="Male: 0-14" stack="section-3" />
          <Series valueField="section-3-Fail" name="Male: 15-64" stack="section-3" />
          <Series
            valueField="section-4-Pass"
            name="Male: 65 and older"
            stack="section-4"
          />
          <Series
            valueField="section-4-Fail"
            name="section-4-Fail"
            stack="section-4"
          />
  
          {/* <ValueAxis>
            <Title text="Populations, millions" />
          </ValueAxis> */}
          {/* <Legend
            position="inside"
            columnCount={4}
            //customizeItems={customizeItems}
            horizontalAlignment="right"
          >
            <Border visible={true} />
          </Legend> */}
          {/* <Export enabled={true} /> */}
          <Tooltip enabled={true} />
        </Chart>
      );
    }
  
  // function customizeItems(items) {
  //   const sortedItems = [];
  //   var stackIndex = 0;
  //   items.forEach((item) => {
  //     if (item.series.stack === "section1") {
  //       stackIndex = 0;
  //     } else if (item.series.stack === "section2") {
  //       stackIndex = 1;
  //     } else if (item.series.stack === "section3") {
  //       stackIndex = 2;
  //     } else if (item.series.stack === "section4") {
  //       stackIndex = 3;
  //     }
  
  //     // const startIndex = item.series.stack === "section1" ? 0 : 3;
  //     sortedItems.splice(stackIndex, 0, item);
  //   });
  //   return sortedItems;
  // }
  
  const mapStateToProps = state => ({
    subjSectAnalysisdata: state.auth.subjSectAnalysis
});

export default connect(mapStateToProps, null)(SecWisePerfamanceChart);

