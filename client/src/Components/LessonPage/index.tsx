import { useEffect, useState }  from "react"
import { Link, useParams, Routes, Route  } from "react-router-dom";

import { Video } from "../Video";
import { getLesson } from '../../ApiServices'
import { ILesson } from "../../ApiResponseTypes"

import './styles.css'

var Latex = require('react-latex');

const initialLesson : ILesson ={title :'', videoUrls: [], summary:'', exercises:[]}

export const LessonPage = () => {
  const [lesson, setLesson] = useState(initialLesson)

  const { title } = useParams();
  useEffect(() => {
    getLessonPage();
  },[])

  const getLessonPage = async () => {
    if(title){
      const data = await getLesson(title)
      setLesson(data)
    }
  }

  const displayLatex = (string :string) => {
    const re = /express/
    const display = string.split(re)
    return (<div id ='summary'>{display.map((el,index) => index % 2 ==0 ?
      <p className = {'reg-text'}>{el}</p> : <p id = 'latex'><strong><Latex id = 'latex'>{`$${el}$`}</Latex></strong></p>
     )}</div>)
  }
 
  return (<div id = 'lesson-page'>
    <h1 id = 'lesson-title'>{lesson.title}</h1>
    <div>{displayLatex(lesson.summary)}
    {lesson.videoUrls.map(url => <Video link = {url}/>)}
    </div>
    <Link id ='practice-link' to={`/exercises/${lesson.title}/`}><div id = 'practice-box'>Practice</div></Link>
  </div>)
}