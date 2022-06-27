import React from 'react';
import {useLocation} from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  return (
    <div className='container'>
        <h1>Welcome <span style={{color: 'red'}}>{location.state.name}</span> to Home page </h1>
    </div>
  )
}

export default Home;