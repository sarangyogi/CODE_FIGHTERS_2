import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  const handleChange=(e)=>{
    console.log(e.target.value)
  }
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
    {
      data.map((data)=>{
        return (<Card sx={{ minWidth: 150,maxWidth:300 }} key={data.id}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {data.shipTo}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.shipTo}
        </Typography>
        <Typography variant="body2">
          {data.phone}
          <br />
          {/* {'"a benevolent smile"'} */}
          {data.amount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleChange}>Learn More</Button>
      </CardActions>
    </Card>)
      })
    }
    </div>
  );
}
