import * as React from 'react';
import { useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './../dashboard/Title';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import BasicCard from './BasicCard';

// Generate Order Data
function createData(id, date, name,  shipTo, phone, amount) {
  return { id, name, date, shipTo, phone, amount };
}


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const [orders,setOrders]=useState([])
  
  React.useEffect(()=>{

    axios.get('https://apiv2.shiprocket.in/v1/external/orders', {
      headers: {
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1MDAzNDgsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjgxNjM1LCJleHAiOjE2NDkxNDU2MzUsIm5iZiI6MTY0ODI4MTYzNSwianRpIjoibWNOVlMzZmEwcmNLWHFqcyJ9.j6dXxm7sEslmkvy_COFZjwQ8jU0ACaJfL9Ua0-_wj3w`
      }
    })
    .then((res) => {
      console.log(res.data);
      var rows = [];
      for (let i = 0; i < res.data.data.length; i++) {
        rows.push(createData(
          res.data.data[i].id,
          res.data.data[i].created_at,
          res.data.data[i].customer_name,
          res.data.data[i].customer_address,
          res.data.data[i].customer_phone,
          res.data.data[i].total,
        ));
        setOrders((...prev)=>(
          [...rows]
        ))
      }
    })
    .catch((error) => {
      console.error(error)
    })
  },[])
  return (
    <React.Fragment>
        <Navbar/>
      <BasicCard data={orders}/>
    </React.Fragment>
  );
}