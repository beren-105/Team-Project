import List from "./component/List";
import { useState, useEffect } from "react";
import "./index.css";
import marker from "./img/marker.png";
import map from "./img/map.png";

export default function Home(props) {
  const setListId=props.setListId

  const guName = [
    "중구",
    "해운대구",
    "동구",
    "남구",
    "부산진구",
    "동래구",
    "수영구",
  ];
  const [loading, setLoading] = useState(true);
  const [onCl, setOnCl] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState([]);
  const getData = async () => {
    const data = props.data
    setData(data.getFoodKr.item);
  };
  useEffect(() => {
    getData();
    setLoading(false);
  }, []);
  useEffect(() => {
    const ccc = data;
    console.log(onCl);
    setShow(ccc.filter((d) => d.GUGUN_NM === onCl));
  }, [onCl]);
  const onClick = (e) => {
    const isClickedBtn = e.target.attributes.value.value;
    setOnCl(isClickedBtn);
  };
  const close = () => {
    setOnCl("");
  };

  return (
    <div className="total">
      <img src={map} className="map" />
      {guName.map((item, index) => (
        <div key={item} id={`num` + index} className="marker">
          <img
            src={marker}
            value={item}
            onClick={onClick}
            className="marker_img"
          ></img>
          <p value={item} onClick={onClick} className="marker_name">
            {item}
          </p>
        </div>
      ))}
      {loading ? (
        <p>Please Waiting</p>
      ) : (
        <ul>
          {onCl === "" ? null : <button onClick={close}>close</button>}
          {show.map((item, index) => (
            <List
              key={index}
              id={item.GUGUN_NM}
              title={item.MAIN_TITLE}
              address={item.ADDR1}
              keyword={item.RPRSNTV_MENU.split(",")[0]}
              setListId={setListId}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
