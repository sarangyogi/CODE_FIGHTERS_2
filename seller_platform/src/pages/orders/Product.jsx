import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { useParams } from "react-router";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function Product(props) {
  let { id } = useParams();
  console.log(id, "111111");
  const [open, setOpen] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  const [data, setData] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [map, setMap] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({});
  // var data;
  let loc;
  const Map = ReactMapboxGl({
    accessToken:
      "pk.eyJ1IjoiYWRpdHlhLTcxNDMiLCJhIjoiY2t2emprMjAyMmZmOTJwbTlpemZ4Y3ZlbCJ9.DFZZjO-WQ1FWDDCFoxDh1Q",
  });

  useEffect(async() => {
    await axios
      .get(`https://apiv2.shiprocket.in/v1/external/orders/show/${id}`, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1MDAzNDgsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjgxNjM1LCJleHAiOjE2NDkxNDU2MzUsIm5iZiI6MTY0ODI4MTYzNSwianRpIjoibWNOVlMzZmEwcmNLWHFqcyJ9.j6dXxm7sEslmkvy_COFZjwQ8jU0ACaJfL9Ua0-_wj3w`,
        },
      })
      .then((res) => {
        console.log("sssssssssssssssssssssssss",res);
        setData(() => res.data.data);
        setLoad(true)
        loc=res.data.data.billing_city+","+res.data.data.customer_state_name
        // data=res.data.data;
        return;
      });

    await axios
      .get(`http://api.positionstack.com/v1/forward?access_key=228bcd2dd1267a57ff96a67ebf924022&query=${loc}&limit=1`, {
        headers: {
          
        },
      })
      .then((res) => {
        console.log(res.data.data[0].latitude);
        setCoordinates(()=>({longitude: res.data.data[0].longitude,latitude: res.data.data[0].latitude}))
        // data=res.data.data;
        if(coordinates!=null){
          console.log(coordinates)
          setMap(true)
        }
        return;
      });
  }, []);

  // useEffect(()=>{
  //   setMap(true)
  // },[coordinates])
   
  return (
    <div>

      <Navbar />
      { load && <><Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <div className="row">
            <div className="col-md-6">
              {map && <div>
                <Map
                  style="mapbox://styles/mapbox/streets-v9"
                  containerStyle={{
                    height: "500px",
                    width: "100%",
                  }}
                  center={[coordinates.longitude, coordinates.latitude]}
                >
                  
                  <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "marker-15" }}
                  >
                    <Feature
                      coordinates={[coordinates.longitude, coordinates.latitude]}
                    />
                  </Layer>
                  {popup && (
                    <Popup
                      coordinates={[coordinates.longitude, coordinates.latitude]}
                      style={{ zIndex: 4 }}
                    >
                      <p>{data.billing_city}</p>
                      <p>Latitutude: {coordinates.latitude}</p>
                      <p>Longitude: {coordinates.longitude}</p>
                    </Popup>
                  )}
                  <Marker
                    coordinates={[coordinates.longitude, coordinates.latitude]}
                    anchor="bottom"
                  >
                    <div
                      onClick={() => (popup ? setPopup(false) : setPopup(true))}
                    >
                      <FontAwesomeIcon icon={faLocationDot} size="3x" />
                    </div>
                  </Marker>
                </Map>
              </div>}
            </div>
            <div className="col-md-6 order_details" >
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 500,
                  padding: '0px'
                }}
              >
                <h1 style={{ backgroundColor: "#1976d2", color: '#fff' }}>Order Id: {id}</h1>
                <div className="row">
                  <div className="col-md-6">
                    <h3>Billing Details</h3>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Name:</span>{" "}
                      {data.billing_name}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>
                        Billing Address:
                      </span>{" "}
                      {data.billing_address}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>State:</span>{" "}
                      {data.billing_state_name}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Country:</span>{" "}
                      {data.customer_country}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Phone:</span>{" "}
                      {data.billing_phone}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>E-mail:</span>{" "}
                      {data.customer_email}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Amount:</span>{" "}
                      {data.net_total}
                    </h6>
                  </div>
                  <div className="col-md-6">
                    <h3>Shipment Details</h3>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Dimensions:</span>{" "}
                      {data.shipments.dimensions}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Weight:</span>{" "}
                      {data.shipments.weight}kg
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Quantity:</span>{" "}
                      {data.shipments.quantity}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Tax:</span>{" "}
                      {data.shipments.tax}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Status:</span>{" "}
                      {data.shipments.status}
                    </h6>
                    <h6>
                      <span style={{ "fontWeight": "bold" }}>Shipped On:</span>{" "}
                      {data.created_at}
                    </h6>
                  </div>
                </div>
              </Paper>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <h1 style={{ backgroundColor: "#1976d2", color: '#fff' }}>Product Details</h1>
          {data.products.map((product) => (
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <h4 style={{ color: "#1976d2" }}>Product Id: {product.id}</h4>
              <div className="row" >
                <div className="col-md-6" >
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Name:</span>{" "}
                    {product.name}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Channel SKU:</span>{" "}
                    {product.channel_sku}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>MRP:</span>{" "}
                    {product.mrp}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Quantity:</span>{" "}
                    {product.quantity}
                  </h6>
                </div>
                <div className="col-md-6" >
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Discount:</span>{" "}
                    {product.discount}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Net Total:</span>{" "}
                    {product.net_total}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Channel Category:</span>{" "}
                    {product.channel_category}
                  </h6>
                  <h6>
                    <span style={{ "fontWeight": "bold" }}>Tax:</span>{" "}
                    {product.tax}
                  </h6>
                </div>
              </div>
            </Paper>
          ))}
        </Paper>
      </Grid></>}
    </div>
  );
}

export default Product;
