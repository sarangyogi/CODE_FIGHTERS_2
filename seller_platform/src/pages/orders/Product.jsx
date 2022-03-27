import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/navbar'
import { useParams } from "react-router";
import ReactMapboxGl, { Layer, Feature, Marker ,Popup} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';
function Product(props) {
  const [Lattitude,setLattitude]=useState("")
  const [Longitude,setLongitude]=useState("")
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYWRpdHlhLTcxNDMiLCJhIjoiY2t2emprMjAyMmZmOTJwbTlpemZ4Y3ZlbCJ9.DFZZjO-WQ1FWDDCFoxDh1Q",
  });
  
    let { id } = useParams();
    console.log(id,"111111")
    useEffect(() => {
        // axios.get(`https://apiv2.shiprocket.in/v1/external/orders/show/${id}`, {
        //     headers: {
        //       'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1MDAzNDgsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjgxNjM1LCJleHAiOjE2NDkxNDU2MzUsIm5iZiI6MTY0ODI4MTYzNSwianRpIjoibWNOVlMzZmEwcmNLWHFqcyJ9.j6dXxm7sEslmkvy_COFZjwQ8jU0ACaJfL9Ua0-_wj3w`
        //     }
        //   }).then((res)=>{
        //       return 
        //   })
        const address="Sanpada Mumbai";
          axios.get(`http://api.positionstack.com/v1/forward?access_key=228bcd2dd1267a57ff96a67ebf924022&query=${address}&limit=1`).then((res)=>{
            console.log(res)
          })
    }, [])
    
  return (
    <div>
        <Navbar/>
        Product
        {id}
        <div>
              {/* <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                  height: "100vh",
                  width: "100%",
                }}
                center={[-0.481747846041145, 51.3233379650232]}
              >
                <Layer
                  type="symbol"
                  id="marker"
                  layout={{ "icon-image": "marker-15" }}
                >
                  <Feature
                    coordinates={[-0.481747846041145, 51.3233379650232]}
                  />
                </Layer>
                {popup&&<Popup
                  coordinates={[-0.481747846041145, 51.3233379650232]}
                  style={{zIndex: 4}}
                >
                  <p>Mumbai</p>
                  <p>Latitutude: -0.4817</p>
                  <p>Longitude: 51.3233</p>
                </Popup>}
                <Marker
                  coordinates={[-0.481747846041145, 51.3233379650232]}
                  anchor="bottom"
                >
                  <div onClick={() => popup?setPopup(false):setPopup(true)}>
                    <FontAwesomeIcon icon={faLocationDot} size="3x" />
                  </div>
                </Marker>
              </Map> */}
            </div>
    </div>
  )
}

export default Product