 /*global kakao*/ 
 import { useEffect, useRef, useState } from 'react';
 import {Map, MapMarker, MapInfoWindow, Roadview, RoadviewMarker } from 'react-kakao-maps-sdk';
 import {MapMarker as CustomOverlayMap } from 'react-kakao-maps-sdk';
 
 import "./kakaoMap.css"
 
 function KakaoMap(props) {
     const data = props.data.getFoodKr.item[0]
     const [toggle, setToggle] = useState(false)
     const [size, setSize] = useState('992px')

     // console.log(data)
 
     const mapPosition = {
         lat: data.LAT,
         lng: data.LNG
     }
 
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
     
     const mapRef = useRef()
 
     function mapCenter(toggle) {
         setToggle(toggle)
         if (toggle) {
             setSize('496px')
         }
         if (!toggle) {
             setSize('992px')
         }
     }
     
     useEffect(() => {
         if (mapRef.current) {
             mapRef.current.relayout()
             mapRef.current.setCenter(new kakao.maps.LatLng(data.LAT, data.LNG))
         }
     }, [toggle, size])
 
 
     return (  
         <>
         <section className='main'>
             <img
                 src={data.MAIN_IMG_NORMAL}
                 alt={data.MAIN_TITLE}
             />
             <div className='title'>
                 <h4>{data.GUGUN_NM}</h4>
                 <h2>{data.MAIN_TITLE}</h2>
             </div>
         </section>
         <section className='sub'>
             <img
                className='subImg'
                 src={data.MAIN_IMG_THUMB}
                 alt={data.MAIN_TITLE}
             />
             <div className='subContent'>
                 <div className='subTitle'>
                     <h4>대표메뉴</h4>
                     <h3>{data.RPRSNTV_MENU}</h3>
                 </div>
                 <p>{data.ITEMCNTNTS}</p>
                 <p>전화번호 : {data.CNTCT_TEL}</p>
             </div>
         </section>
 
         {/* 지도맵 */}
            <div className='kakaoMap'>
            <h4>오시는 길</h4>
                
                <div className='map'>
                    <button
                        className='mapToggle'
                        onClick={() => mapCenter(!toggle)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
                    </button>
                    <Map
                        center={mapPosition}
                        style={{
                            width: `${size}`,
                            height: "360px",
                        }}
                        level={4}
                        ref={mapRef}
                    >
                        {/* <MapMarker position={mapPosition}>
                            <div className='mapMarker'>{data.MAIN_TITLE}</div>
                        </MapMarker> */}
                        <CustomOverlayMap
                            position={mapPosition}
                        >
                            <div className='mapMarker'>
                                <div className='markerTitle'>{data.MAIN_TITLE}</div>
                                <div className='markerText'>
                                    <img
                                        src={data.MAIN_IMG_THUMB}
                                    />
                                    <p>{data.ADDR1}</p>
                                </div>
                            </div>
                        </CustomOverlayMap>
                        {/* <MapTypeId type={kakao.maps.MapTypeId.ROADVIEW}/> */}
                    </Map>
    
                {/* 로드뷰 */}
                    <div className={`roadview ${toggle ? null : 'hidden'}`}>
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
            <p>주소 : {data.ADDR1}</p>
            </div>
         </>
     )
   }
 
   export default KakaoMap
