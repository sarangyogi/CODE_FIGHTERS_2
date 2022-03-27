import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/navbar'
import { useParams } from "react-router";
import axios from 'axios';
function Product(props) {
    let { id } = useParams();
    console.log(id,"111111")
    useEffect(() => {
        axios.get(`https://apiv2.shiprocket.in/v1/external/orders/show/${id}`, {
            headers: {
              'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjI1MDAzNDgsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjQ4MjgxNjM1LCJleHAiOjE2NDkxNDU2MzUsIm5iZiI6MTY0ODI4MTYzNSwianRpIjoibWNOVlMzZmEwcmNLWHFqcyJ9.j6dXxm7sEslmkvy_COFZjwQ8jU0ACaJfL9Ua0-_wj3w`
            }
          }).then((res)=>{
              return 
          })
    }, [])
    
  return (
    <div>
        <Navbar/>
        Product
        {id}
    </div>
  )
}

export default Product