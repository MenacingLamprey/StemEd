import { FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './styles.css'

interface IProps {
  isAuthenticated : boolean
}

export const NavBar :FunctionComponent<IProps> = ({isAuthenticated}) => {
  const navigate = useNavigate();

  return (<div id = 'nav-bar'>
    <div id = 'navigation'>
      <h4><Link to={''} onClick={() =>navigate(-1)} id ='link'>Back</Link></h4>
      <h4><Link to={`/`} id ='link'>Home</Link></h4>
    </div>
    <h4>{isAuthenticated ? 
      <div>
        <Link to={'/profile'} id ='link'>Profile</Link>
        <Link to={'/logout'} id ='link'>Logout</Link>
      </div> :
      <div>
        <Link to={'/login'} id ='link'>Login</Link>
        <Link to={'/register'} id ='link'>Register</Link>
      </div>}
    </h4>
  </div>) 
}