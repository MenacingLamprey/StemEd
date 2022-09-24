import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LandingPage } from './Components/LandingPage';
import { NavBar } from './Components/NavBar'
import { TopicPage } from "./Components/TopicPage";
import { LessonPage } from './Components/LessonPage'

import './App.css';
import { ExercisePage } from "./Components/ExercisePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div id = 'underlay' />
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/topic/:title" element={<TopicPage/>}/>
          <Route path="/lesson/:title" element={<LessonPage/>}/>
          <Route path="/exercises/:lesson/" element = {<ExercisePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
