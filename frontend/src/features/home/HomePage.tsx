import React from 'react'
import {Link} from 'react-router-dom'


export default function HomePage(){
  return (
    <div>
      <h1>Home Page</h1>
      <h3><Link to="/activities">Activity</Link></h3>
    </div>);
}

