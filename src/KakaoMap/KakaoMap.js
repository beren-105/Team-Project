 /*global kakao*/ 
 import { useEffect, useRef, useState } from 'react';
 import {Map, MapMarker, MapInfoWindow, Roadview, RoadviewMarker } from 'react-kakao-maps-sdk';
 import { Link, useLocation } from 'react-router-dom';
 
 import "./kakaoMap.css"
 
 function KakaoMap(props) {
     const Alldata = props.data
     const location = useLocation()
     const id = location.state.id

     const filterArray = Alldata.getFoodKr.item.filter((items)=> {
        return items.ADDR1 == id
      })
     const data = filterArray[0]
    

     const [toggle, setToggle] = useState(false)
     const [markerInfo, setMarkerInfo] = useState(true)
     const [size, setSize] = useState('992px')
     const [level, setLevel] = useState(4)
     const [resetRoadview, setResetRoadview] = useState()
     const roadviewRef = useRef()
     const mapRef = useRef()
 
     const mapPosition = {
         lat: data.LAT,
         lng: data.LNG
     }
 
     useEffect(() => {
        if (mapRef.current) {
            mapRef.current.relayout()
            mapRef.current.setCenter(new kakao.maps.LatLng(data.LAT, data.LNG))
        }
    }, [toggle, size])

    //  로드뷰 마커 포커스 이벤트
     function markerCenter(marker) {
         const rv = marker.getMap()
         const projection = rv.getProjection()
         const viewpoint = projection.viewpointFromCoords(
             marker.getPosition(),
             marker.getAltitude()
         )
         rv.setViewpoint(viewpoint)
         rv.relayout()
     }
     

     // 리사이징 이벤트
     function mapCenter(toggle) {
         setToggle(toggle)
         if (toggle) {
             setSize('496px')
         }
         if (!toggle) {
             setSize('992px')
         }
     }

     // 지도 초기화버튼
     function mapReset() {
        mapRef.current.setCenter(new kakao.maps.LatLng(data.LAT, data.LNG))
     }
     
     // 로드뷰 초기화
     function viewReset() {
        const roadview = roadviewRef.current
        roadview.setViewpoint(resetRoadview.viewpoint)
        roadview.setPanoId(
            resetRoadview.panoid,
            new kakao.maps.LatLng(data.LAT, data.LNG)
        )
     }
     
 
     
     return (  
         <>
         <Link to='/'>
            <button className='back'>BACK</button>
         </Link>
         <section className='mapMain'>
             <img
                 src={data.MAIN_IMG_NORMAL}
                 alt={data.MAIN_TITLE}
             />
             <div className='mainTitle'>
                 <h4>{data.GUGUN_NM}</h4>
                 <h2>{data.MAIN_TITLE}</h2>
                 <p>전화번호 : {data.CNTCT_TEL}</p>
             </div>
         </section>
         <section className='mapSub'>
             <img
                 src={data.MAIN_IMG_THUMB}
                 alt={data.MAIN_TITLE}
             />
             <div>
                 <div>
                     <h4>대표메뉴</h4>
                     <h3>{data.RPRSNTV_MENU}</h3>
                 </div>
                 <p className='textarea'>{data.ITEMCNTNTS}</p>
             </div>
         </section>
 
         {/* 지도맵 */}
            <div className='kakaoMap mapSub'>
            <h4>오시는 길</h4>
                
                <div className='map'>
                    <div className='mapBtn'>
                        <button
                            className='roadviewToggle btn'
                            onClick={() => mapCenter(!toggle)}  
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
                            <span>로드뷰</span>
                        </button>
                        <div>
                            <button className='btn' onClick={() => mapReset()}>지도 초기화</button>
                        </div>
                    </div>
                    <div className='mapBtn2'>
                            <button className='btn' onClick={() => setLevel(level-1)}>+</button>
                            <button className='btn' onClick={() => setLevel(level+1)}>-</button>
                    </div>
                    <Map
                        center={mapPosition}
                        style={{
                            width: `${size}`,
                            height: "360px",
                        }}
                        level={level}
                        ref={mapRef}
                    >
                        <MapMarker
                            position={mapPosition}
                            onClick={() => setMarkerInfo(!markerInfo)}
                            xAnchor={0.5}
                            yAnchor={1.5}
                        >
                            {markerInfo ?
                            <div
                                className='mapMarker'
                            >
                                <div className='markerTitle'>{data.MAIN_TITLE}</div>
                                <div className='markerContent'>
                                    <img
                                        src={data.MAIN_IMG_THUMB}
                                    />
                                    <p>{data.ADDR1}</p>
                                </div>
                            </div>
                            :null}
                        </MapMarker>
                    </Map>
    
                {/* 로드뷰 */}
                    <div style={{display: `${toggle ? 'block' : 'none'}`, position: 'relative'}}>
                        <button
                            className='mapBtn btn'
                            onClick={() => viewReset()}
                        >
                            지도 초기화
                        </button>
                        <Roadview
                        position={{
                            lat: data.LAT,
                            lng: data.LNG,
                            radius: 50
                        }}
                        style={{
                            width: "496px",
                            height: "360px",
                        }}
                        ref={roadviewRef}
                        onInit={(roadview) => {
                            const viewpoint = roadview
                            .getProjection()
                            .viewpointFromCoords(
                                new kakao.maps.LatLng(data.LAT, data.LNG),
                                0
                            )
                            roadview.setViewpoint(viewpoint)
                            setResetRoadview({
                            viewpoint: viewpoint,
                            panoid: roadview.getPanoId(),
                            })
                        }}
                        >
                            <RoadviewMarker
                                position={mapPosition}
                                altitude={6}
                                range={100}
                                onCreate={(marker) => markerCenter(marker)}
                            >
                                <div className=''>{data.MAIN_TITLE}</div>
                            </RoadviewMarker>
                        </Roadview>
                    </div>
                </div>
            </div>
         </>
     )
   }
 
   export default KakaoMap
