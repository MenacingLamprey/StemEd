import {FunctionComponent} from 'react';
import { Auth } from '../../utils/Auth';
import { logout } from '../../AuthApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './styles.css'

interface IProps {
  setIsAuthenticated : Function;
}

export const Logout :FunctionComponent<IProps> = ({ setIsAuthenticated }) => {
  let navigate = useNavigate();
  const handleClick = () => {
    removeToken();
    handleAuth();
  };

  const removeToken = () => logout('accessToken');

  const handleAuth = () => {
    setIsAuthenticated(false);
    Auth.logout(() => navigate('/'));
  };

  return (
    <div id ='logout'>
      <h2>Are you sure you want to log out?</h2>
      <div id ='buttons'>
      <Link to="/">
        <button className="confirm-btn">No</button>
      </Link>
      <Link to="/">
      <button className="confirm-btn" onClick={() => handleClick()}>
        Yes
      </button>
      </Link>
      </div>
    </div>
  );
};