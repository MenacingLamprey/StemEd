import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { LandingPage } from './Components/LandingPage';
import { NavBar } from './Components/NavBar'
import { TopicPage } from "./Components/TopicPage";
import { LessonPage } from './Components/LessonPage'
import { ExercisePage } from "./Components/ExercisePage";
import { Register } from "./Components/Register";
import { Profile } from './Components/Profile';
import { Auth } from './utils/Auth';
import { Logout } from "./Components/Logout";
import { Login } from "./Components/Login";

import './App.css';

function App() {
  const initialState : boolean  = Auth.isAuthenticated()
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar isAuthenticated ={isAuthenticated}/>
        <div id = 'underlay' />
        <Routes>
          <Route path="/" element={<LandingPage isAuthenticated = {isAuthenticated} setIsAuthenticated ={setIsAuthenticated} />}/>
          <Route path="/topic/:title" element={<TopicPage/>}/>
          <Route path="/lesson/:title" element={<LessonPage auth ={isAuthenticated}/>}/>
          <Route path="/exercises/:lesson/" element = {<ExercisePage />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;