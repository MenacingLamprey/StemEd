import { useEffect, useState } from 'react';
import { profile }from '../../AuthApi';
import { LessonCard } from '../LessonCard';

import './styles.css'

const initialState = {
  username : '',
  completedLessons: [],
};

export const Profile = () => {
  const [state, setState] = useState(initialState);
  const username = state.username || 'Missing';
  const completedLessons= state.completedLessons || 'No.';

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getProfile = async (accessToken :string) => {
      const userInfo = await profile(accessToken);

      if (userInfo) {
        const { username, completedLessons } = userInfo

        setState((prevState) => {
          return {
            ...prevState,
            username,
            completedLessons,
          };
        })
      } else {
        console.log('No user info found 😞');
      }
    };

    accessToken  && getProfile(accessToken);
    
  }, []);
  return (
    <div id ='profile-container'>
      <h2>My Profile</h2>
      <h3>
        Hello {username}
      </h3>
      <h4>You have Completed These Lessons</h4>
      {completedLessons.length ? 
      <div id = 'lessons'>
      {completedLessons.map(lesson => <LessonCard lesson ={lesson}/>)}
      </div> : <h4>No Completed Lessons</h4>}
    </div>
  );
};
