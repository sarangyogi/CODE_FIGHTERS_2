import React from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
function SubPoints({ data }) {
  const [open, setOpen] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYWRpdHlhLTcxNDMiLCJhIjoiY2t2emprMjAyMmZmOTJwbTlpemZ4Y3ZlbCJ9.DFZZjO-WQ1FWDDCFoxDh1Q",
  });
  console.log(data, "rrrrr");
  return (
    <div>
      {data.map((data) => {
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "70vh",
            width: "80%",
          }}
          center={data[0]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}
          >
            <Feature coordinates={data[0]} />
          </Layer>
          {popup && (
            <Popup coordinates={data[0]} style={{ zIndex: 4 }}>
              <p>Mumbai</p>
              <p>Latitutude: {data[0][0]}</p>
              <p>Longitude: {data[0][1]}</p>
            </Popup>
          )}
          <Marker coordinates={data[0]} anchor="bottom">
            <div onClick={() => (popup ? setPopup(false) : setPopup(true))}>
              <FontAwesomeIcon icon={faLocationDot} size="3x" />
            </div>
          </Marker>
        </Map>;
      })}
    </div>
  );
}

export default SubPoints;
