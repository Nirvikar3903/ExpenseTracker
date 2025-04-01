import React, { useContext, useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import  { AppContext } from '../context/AppProvider';


const PieChart = ({filteredTransaction , setFilteredTransaction}) => {

  const {transactions} = useContext(AppContext);

  const [foodTotalAmount , setFoodTotalAmount] = useState(null);
  const [groceriesTotalAmount , setGroceriesTotalAmount] = useState(null);
  const [travelTotalAmount , setTravelTotalAmount] = useState(null);
  const [healthTotalAmount , setHealthTotalAmount] = useState(null);

  useEffect(() => {
    setFilteredTransaction(transactions);
  }, [transactions]);
  

  useEffect(() => {
    const foodCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Food and Drinks")
      .reduce((acc, item) => {  
        return acc + item.amount;
      }, 0);

    const groceriesCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Groceries")
      .reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

    const travelCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Travel")
      .reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

    const healthCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Health")
      .reduce((acc, item) => {
        return acc + item.amount;
      }, 0);

    setFoodTotalAmount(foodCategory);
    setGroceriesTotalAmount(groceriesCategory);
    setTravelTotalAmount(travelCategory);
    setHealthTotalAmount(healthCategory);
  }, [filteredTransaction]);



  const data1 = [
    { label: "Food and Drinks", value: foodTotalAmount },
    { label: "Groceries", value: groceriesTotalAmount },
    { label: "Health", value: healthTotalAmount },
    { label: "Travel", value: travelTotalAmount, color: "#73c0de" },
  ];


  const option = {
    title: {
      text: "Expenses Chart",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: data1.map((item) => item.label),
    },
    // series: [
    //   {
    //     name: "Expense",
    //     type: "pie",
    //     radius: "60%",
    //     center: ["50%", "50%"],
    //     itemStyle: {
    //       borderRadius: 10,
    //       borderColor: '#fff',
    //       borderWidth: 2
    //     },
    //     data: data1.map((item) => ({
    //       value: item.value,
    //       name: item.label,
    //       itemStyle: { color: item.color },
    //     })),
    //     emphasis: {
    //       itemStyle: {
    //         shadowBlur: 10,
    //         shadowOffsetX: 0,
    //         shadowColor: "rgba(0, 0, 0, 0.5)",
    //       },
    //     },
    //   },
    // ],
    series: [
      {
        name: "Expense",
        type: "pie",
        radius: ["50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data1.map((item) => ({
          value: item.value,
          name: item.label,
          itemStyle: { color: item.color },
        })),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "canvas" }} // Optional: to use canvas for rendering (better performance in many cases)
      />
    </div>
  );
}

export default PieChart




// export type Opts = {
//   readonly devicePixelRatio?: number;
//   readonly renderer?: 'canvas' | 'svg';
//   readonly width?: number | null | undefined | 'auto';
//   readonly height?: number | null | undefined | 'auto';
//   readonly locale?: string;
// };

// export type EChartsReactProps = {
//   /**
//    * echarts library entry, use it for import necessary.
//    */
//   readonly echarts?: any;
//   /**
//    * `className` for container
//    */
//   readonly className?: string;
//   /**
//    * `style` for container
//    */
//   readonly style?: CSSProperties;
//   /**
//    * echarts option
//    */
//   readonly option: EChartsOption;
//   /**
//    * echarts theme config, can be:
//    * 1. theme name string
//    * 2. theme object
//    */
//   readonly theme?: string | Record<string, any>;
//   /**
//    * notMerge config for echarts, default is `false`
//    */
//   readonly notMerge?: boolean;
//   /**
//    * replaceMerge config for echarts, default is `null`
//    */
//   readonly replaceMerge?: string | string[];
//   /**
//    * lazyUpdate config for echarts, default is `false`
//    */
//   readonly lazyUpdate?: boolean;
//   /**
//    * showLoading config for echarts, default is `false`
//    */
//   readonly showLoading?: boolean;
//   /**
//    * loadingOption config for echarts, default is `null`
//    */
//   readonly loadingOption?: any;
//   /**
//    * echarts opts config, default is `{}`
//    */
//   readonly opts?: Opts;