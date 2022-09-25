import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { MathJax } from 'better-react-mathjax'
import { ILesson } from '../../ApiResponseTypes'

import './styles.css'

var Latex = require('react-latex');
interface IProps {
  lesson : ILesson
} 

export const LessonCard : FunctionComponent<IProps> = ({ lesson }) => {

  return (<Link id ='topic-link' to={`/lesson/${lesson.title}`}><div className='lesson'>
  <h4 className = 'lesson-name'>{lesson.title}</h4>
  <MathJax>{lesson.summary}</MathJax>
  </div></Link>)
}