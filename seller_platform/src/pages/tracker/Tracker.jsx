import React, { useState, useEffect } from "react";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "../../components/navbar/navbar";
import SubPoints from "./SubPoints";

function Tracker() {
  const [Lattitude, setLattitude] = useState("");
  const [Longitude, setLongitude] = useState("");
  const [Locations, setLocations] = useState([]);
  const [Loding, setLoding] = useState(false);
  const [Count, setCount] = useState(0);
  const [Cordinate, setCordinate] = useState([]);
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYWRpdHlhLTcxNDMiLCJhIjoiY2t2emprMjAyMmZmOTJwbTlpemZ4Y3ZlbCJ9.DFZZjO-WQ1FWDDCFoxDh1Q",
  });
  const [open, setOpen] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // let newone=[]
  const getcordinate = async () => {
    return Locations.map((address) => {
      let temp = [];
      axios
        .get(
          `http://api.positionstack.com/v1/forward?access_key=228bcd2dd1267a57ff96a67ebf924022&query=${address}&limit=1`
        )
        .then((res) => {
          temp.push([res.data.data[0].latitude, res.data.data[0].longitude]);
          setLoding(true);
        });
      return temp;
    });
  };
  useEffect(async () => {
    await axios
      .get(`https://apiv2.shiprocket.in/v1/external/orders`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1MDAzNDgsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjgxNjM1LCJleHAiOjE2NDkxNDU2MzUsIm5iZiI6MTY0ODI4MTYzNSwianRpIjoibWNOVlMzZmEwcmNLWHFqcyJ9.j6dXxm7sEslmkvy_COFZjwQ8jU0ACaJfL9Ua0-_wj3w`,
        },
      })
      .then((res) => {
        setLocations(
          res.data.data.map((item) => {
            return item.customer_city + " " + item.customer_state;
          })
        );
      });
    console.log(Locations, "hello");
    setCordinate(await getcordinate(Locations));
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => setCount(1)} className="btn-primary" style={{padding:"5px",borderRadius:"10px"}}>Show Map</button>
        {Count === 1 ? (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100%",
            }}
            center={[-0.481747846041145, 51.3233379650232]}
          >
            {Loding ? <SubPoints data={Cordinate} /> : null}
            {/* <SubPoints /> */}
          </Map>
        ) : null}
        {/* 15.30714, 30.79762 */}
      </div>
    </>
  );
}

export default Tracker;
