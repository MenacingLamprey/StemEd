import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { ILesson } from '../../ApiResponseTypes'

import './styles.css'
interface IProps {
  lesson : ILesson
} 

export const LessonCard : FunctionComponent<IProps> = ({ lesson }) => {

  return (<div className='lesson'>
  <Link id ='topic-link' to={`/lesson/${lesson.title}`}><h4 className = 'topic-name'>{lesson.title}</h4></Link>
    <p className='lesson-descript'>{lesson.summary}</p>
  </div>)
}