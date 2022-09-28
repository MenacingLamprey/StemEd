import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { MathJax } from 'better-react-mathjax'
import { ILesson } from '../../ApiResponseTypes'

import './styles.css'
interface IProps {
  lesson : ILesson

} 

export const LessonCard : FunctionComponent<IProps> = ({ lesson }) => {
  
  return (<div id = 'lesson-card'> 
    <h4 id = 'title'>{lesson.title}</h4>
    <Link id ='lesson-link' to={`/lesson/${lesson.title}`}>
      <div className='lesson' style={{ backgroundImage: `url(${lesson.background})`  }}/>
    </Link>
  </div>)
  
}