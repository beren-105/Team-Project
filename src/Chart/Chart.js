import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import "./style.css";



export default function Chart(props) {
  const data = props.data;
console.log(props.toggle);
  return (
    <div className='main' >
      <div className='modal'>

      <button className='close' onClick={()=> props.setToggle(!props.toggle)}>CLOSE</button>

      <h1>부산에 맛집이 가장 많은 곳은?</h1>

      {data.getFoodKr.totalCount > 0 ? (
        <div className='charCon'>
          {/* <h2>요약</h2>
          <p>
            총 {data.getFoodKr.totalCount}개의 맛집이 있습니다. <br />
            그중 맛집이 많은 곳입니다.
          </p> */}

          <h2 className='title'>CHART</h2>
          <Rechart accidents={data.getFoodKr.item} />
        </div>
      ):(
        <p>맛집이 없습니다</p>
      )}
      </div>
      
    </div>
  )
}

function Rechart({accidents}) {
  const chartData = accidents.map(accident => {
    return {
      name: accident.GUGUN_NM
    }
  })

  const count = accidents.map(accident => {
    return accident.GUGUN_NM
  }) 

  // 구군 중복 제거
  const deduplication = [...new Set(chartData.map(JSON.stringify))].map(JSON.parse);
  
  // 각 구군 중복 카운트
  const result = {};
  count.forEach((x) => { 
    result[x] = (result[x] || 0) + 1
  });

  // const key = Object.keys(result);
  const value = Object.values(result);
  // console.log(value);

  // deduplication에 맛집수 추가
  let i = 0
  while (i < value.length) {
    deduplication[i].맛집수 = value[i];
    i++
  }
  
  // 상위 구군 7개 뽑기
  deduplication.sort((a, b) => {
    if(a.맛집수 > b.맛집수) return -1;
    if(a.맛집수 < b.맛집수) return 1;
    
    return 0;
  })
  
  const data = deduplication.slice(0, 7);
  // console.log(data);

  return (
    <div className ='chart'>
      <ResponsiveContainer width="95%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="##A6A6A6"/>
            <YAxis stroke="#A6A6A6"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="맛집수" fill="#f44336" barSize={60} />
          </BarChart>
      </ResponsiveContainer>
    </div>
  )
}