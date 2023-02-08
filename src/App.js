import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from "react-router-dom"
import React, {useState, useEffect} from 'react';

//맵
import KakaoMap from "./KakaoMap/KakaoMap" 
import Chart from "./Chart/Chart" 

function fetchData() {

  const promise = fetch(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=10&resultType=json`)

    .then(res => {
      if (!res.ok) {
        throw res;
      }
      return res.json()
    })
   
    return promise;
}

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(null);

  // console.log(data);

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsLoaded(true))
  }, []) // 한번만 실행하기 때문에 빈 어레이가 있어야한다.

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }

  
  
  return (
    <>
      <Chart
        data={data}
      />
      {/* <KakaoMap
        data={data}
      /> */}
    </>
  )
}


