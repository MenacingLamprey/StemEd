import { Link, Navigate, useNavigate } from 'react-router-dom'

import './styles.css'

export const NavBar = () => {

  const navigate = useNavigate();

  return (<div id = 'nav-bar'>
    <h4><Link to={`/`} id ='link'>Home</Link></h4>
    <h4><Link to={''} onClick={() =>navigate(-1)} id ='link'>Back</Link></h4>
  </div>) 
}