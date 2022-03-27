import React from 'react'
import Navbar from '../../components/navbar/navbar'
import { useParams } from "react-router";
function Product(props) {
    let { id } = useParams();
    console.log(id,"111111")
  return (
    <div>
        <Navbar/>
        Product
        {id}
    </div>
  )
}

export default Product