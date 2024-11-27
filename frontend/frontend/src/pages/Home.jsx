import { Button } from '@mui/material'
import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
    <div className='button-align'>
      <Button variant='contained' component={Link} to="/add-money" >Add Money</Button>
      <Button variant='contained' component={Link} to="/transfer-money" >Transfer Money</Button>
    </div>
    </div>
  )
}

export default Home
Home