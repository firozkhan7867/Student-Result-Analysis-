import React from "react";

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
  
  const dataSource = service.getMaleAgeData();
  
  class SecWisePerfamanceChart extends React.Component {
    render() {
      return (
        <Chart
          id="chart"
          
          dataSource={dataSource}
        >
          <CommonSeriesSettings argumentField="state" type="stackedBar" />
          <Series
            valueField="section1pass"
            name="Male: 0-14"
            stack="section1"
            color="red"
          />
          <Series
            valueField="section1fail"
            name="Male: 15-64"
            stack="section1"
            color="green"
          />
          <Series
            valueField="section2pass"
            name="Male: 65 and older"
            stack="section2"
            color="pink"
          />
          <Series
            valueField="section2fail"
            name="Female: 0-14"
            stack="section2"
          />
  
          <Series valueField="section3pass" name="Male: 0-14" stack="section3" />
          <Series valueField="section3fail" name="Male: 15-64" stack="section3" />
          <Series
            valueField="section4pass"
            name="Male: 65 and older"
            stack="section4"
          />
          <Series
            valueField="section4fail"
            name="Female: 0-14"
            stack="section4"
          />
  
          <ValueAxis>
            <Title text="Populations, millions" />
          </ValueAxis>
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
  
  export default SecWisePerfamanceChart;
  