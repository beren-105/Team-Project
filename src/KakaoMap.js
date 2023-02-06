import { useEffect, useRef, useState } from 'react';
import {Map, MapMarker, MapInfoWindow, Roadview, RoadviewMarker } from 'react-kakao-maps-sdk';

import "./kakaoMap.css"

function KakaoMap(props) {
    const data = props.data.getFoodKr.item[0]
    const [toggle, setToggle] = useState(false)
    
    // console.log(data)

    const mapPosition = {
        lat: data.LAT,
        lng: data.LNG
    }

    // 로드뷰 마커 포커스 이벤트
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
    useEffect(() => {
        const map = mapRef.current
        if (map) {
          map.relayout()
        }
      }, [toggle])

    return (  
        <>
        {/* <section>
            <img
                src={data.MAIN_IMG_NORMAL}
                alt=''
            />
            <div>
                <h4>{data.GUGUN_NM}</h4>
                <h2>{data.MAIN_TITLE}</h2>
            </div>
        </section>
        <section>
            <img
                src={data.MAIN_IMG_THUMB}
                alt=''
            />
            <div>
                <div>
                    <h4>대표메뉴</h4>
                    <h3>{data.RPRSNTV_MENU}</h3>
                </div>
                <p>{data.ITEMCNTNTS}</p>
                <p>{data.CNTCT_TEL}</p>
            </div>
        </section> */}

        {/* 지도맵 */}
        <section className='kakaoMap'>
            <button
                className='mapToggle'
                onClick={() => setToggle(!toggle)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg>
            </button>
            <div className='map'>
                <Map
                center={mapPosition}
                style={{
                    width: `${toggle ? "360px" : "720px"}`,
                    height: "360px",
                }}
                level={3}
                >
                    <MapMarker position={mapPosition}>
                        <div className='mapMarker'>{data.MAIN_TITLE}</div>
                    </MapMarker>
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
                        width: "360px",
                        height: "360px",
                    }}
                    >
                        <RoadviewMarker
                            position={mapPosition}
                            altitude={6}
                            range={100}
                            onCreate={(marker) => markerCenter(marker)}
                        >
                            <div className='mapMarker'>{data.MAIN_TITLE}</div>
                        </RoadviewMarker>
                    </Roadview>
                </div>
            </div>
            <p>주소 : {data.ADDR1}</p>
        </section>
        </>
    )
  }

  export default KakaoMap