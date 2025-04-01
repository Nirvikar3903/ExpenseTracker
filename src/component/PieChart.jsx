import React, { useState } from 'react'
import ReactECharts from "echarts-for-react";


const PieChart = ({transactions}) => {

  const [transactions , setFilteredTransaction] = useState(transactions)

  const [foodTotalAmount , setFoodTotalAmount] = useState(null);
  const [groceriesTotalAmount , setGroceriesTotalAmount] = useState(null);
  const [travelTotalAmount , setTravelTotalAmount] = useState(null);
  const [healthTotalAmount , setHealthTotalAmount] = useState(null);
  
  return (
    <div>PieChart</div>
  )
}

export default PieChart