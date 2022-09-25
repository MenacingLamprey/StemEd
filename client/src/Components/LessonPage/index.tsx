import { useEffect, useState, FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom';

import { Video } from '../Video';
import { getLesson } from '../../ApiServices'
import { ILesson } from '../../ApiResponseTypes'
import { MathJax } from 'better-react-mathjax'
import './styles.css'

const initialLesson: ILesson = { title: '', videoUrls: [], summary: '', exercises: [] }
export const LessonPage = () => {
  const [lesson, setLesson] = useState(initialLesson)

  const { title } = useParams();
  useEffect(() => {
    getLessonPage();
  }, [])

  const getLessonPage = async () => {
    if(title){
      try {
      const data = await getLesson(title)
      setLesson(data)
      } catch (e) {
        return e
      }
    }
  }

  return (<div id = 'lesson-page'>
    <h1 id = 'lesson-title'>{lesson.title}</h1>
    <div><h3><MathJax>{lesson.summary}</MathJax></h3>
    {lesson.videoUrls.map(url => <Video link = {url}/>)}
    </div>
    <Link id ='practice-link' to={`/exercises/${lesson.title}/`}><div id = 'practice-box'>Practice</div></Link>
  </div>)
}