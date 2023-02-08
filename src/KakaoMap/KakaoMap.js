 /*global kakao*/ 
 import { useEffect, useRef, useState } from 'react';
 import {Map, MapMarker, MapInfoWindow, Roadview, RoadviewMarker } from 'react-kakao-maps-sdk';
 import {MapMarker as CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link, useLocation } from 'react-router-dom';
 
 import "./kakaoMap.css"
 
 function KakaoMap(props) {
     const Alldata = props.data
     const location = useLocation()
     const id = location.state.id
    //  console.log(id)

     const filterArray = Alldata.getFoodKr.item.filter((items)=> {
        return items.ADDR1 == id
      })
     const data = filterArray[0]
    

     const [toggle, setToggle] = useState(false)
     const [size, setSize] = useState('992px')
 
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
         <Link to='/'>
            <button>뒤로가기</button>
         </Link>
         <section>
             <img
                 src={data.MAIN_IMG_NORMAL}
                 alt={data.MAIN_TITLE}
             />
             <div>
                 <h4>{data.GUGUN_NM}</h4>
                 <h2>{data.MAIN_TITLE}</h2>
             </div>
         </section>
         <section>
             <img
                 src={data.MAIN_IMG_THUMB}
                 alt={data.MAIN_TITLE}
             />
             <div>
                 <div>
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
                        <CustomOverlayMap
                            position={mapPosition}
                        >
                            <div className='mapMarker'>
                                <div>{data.MAIN_TITLE}</div>
                                <div>
                                    <img
                                        src={data.MAIN_IMG_THUMB}
                                    />
                                    <p>{data.ADDR1}</p>
                                </div>
                            </div>
                        </CustomOverlayMap>
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
            </div>
         </>
     )
   }
 
   export default KakaoMap
