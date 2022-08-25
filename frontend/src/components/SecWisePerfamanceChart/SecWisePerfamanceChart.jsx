import React from "react";
import "./featuredinfo.css"

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Tooltip,
  } from "devextreme-react/chart";
  // import { fetchSubjSectAnalysys } from '../../actions/visua';
  import { connect } from 'react-redux';
  
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
            name="Section 1 Pass"
            stack="section-1"
            color="#101e9c"
          />
          <Series
            valueField="section-1-Fail"
            name="Section 1 Fail"
            stack="section-1"
            color="#00BFFF"
          />
          <Series
            valueField="section-2-Pass"
            name="Section 2 Pass"
            stack="section-2"
            color="#DC143C"
          />
          <Series
            valueField="section-2-Fail"
            name="Section 2 Fail"
            stack="section-2"
            color="#FF6347"
          />
  
          <Series valueField="section-3-Pass" name="Section 3 Pass" stack="section-3" color="#DAA520"/>
          <Series valueField="section-3-Fail" name="Section 3 Fail" stack="section-3" color="#EADDCA"/>
          <Series
            valueField="section-4-Pass"
            name="Section 4 Pass"
            stack="section-4"
            color="#722F37"
          />
          <Series
            valueField="section-4-Fail"
            name="section 4 Fail"
            stack="section-4"
            color="#CBC3E3"
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

