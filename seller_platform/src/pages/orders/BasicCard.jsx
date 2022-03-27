import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({data}) {
  console.log(data,"00000000");
  return (
    <div style={{display:"flex",justifyContent:"space-around", marginTop:"25px"}}>
    {
      data.map((data)=>{
        return (<Card sx={{ minWidth: 150,maxWidth:300 }} key={data.id}>
      <CardContent style={{textAlign:"left"}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {data.shipTo}
        </Typography>
        <br />
        <Typography variant="body2">
          Phone : {data.phone}
          <br />
          {/* {'"a benevolent smile"'} */}
          Amount: {data.amount}
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent:"right",paddingRight:"20px"}}>
        <Link to={`/orders/${data.id}`}> View More </Link>
      </CardActions>
    </Card>)
      })
    }
    </div>
  );
}
