import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams } from "react-router-dom"
import React, {useState, useEffect} from 'react';

// 각 파일 불러오기
import Home from "./router/Home";
import KakaoMap from "./KakaoMap/KakaoMap" 
import Chart from "./Chart/Chart"

function fetchData() {
  const promise = fetch(`https://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${process.env.REACT_APP_API_KEY}&pageNo=1&numOfRows=150&resultType=json`)

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


  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsLoaded(true))
  }, [])

  if (error) {
    return <p>failed to fetch</p>
  }

  if (!isLoaded) {
    return <p>fetching data...</p>
  }


  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout
            data={data}
          />}
        />
        <Route path='map' element={<KakaoMap data={data} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}

// 홈&차트
function Layout(props) {
  const data=props.data
  const listId=props.listId
  const setListId=props.setListId

  const [toggle, setToggle] = useState(false)
  return (
    <>
      {toggle ? null : <button onClick={() => setToggle(!toggle)}>열기</button>}
      <Home
        data={data}
        listId={listId}
        setListId={setListId}
      />
      {toggle ?
        <Chart
          data={data}
          toggle={toggle}
          setToggle={setToggle}
        />
        : null}
      
    </>
  )
}

//페이지를 찾을 수 없을 시
function NotFound() {
  return <p>404 Not Found</p>
}