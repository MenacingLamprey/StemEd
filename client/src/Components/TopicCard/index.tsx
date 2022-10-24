import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '../../ApiResponseTypes'

import './styles.css'
interface IProps {
  topic : ITopic
} 

export const TopicCard : FunctionComponent<IProps> = ({ topic }) => {

  return (<div> 
    <h4 id = 'title'>{topic.title}</h4>
    <Link id ='topic-link' to={`/topic/${topic.title}`}>
      <div className='topic' style={{ backgroundImage: `url(${topic.background})`  }}/>
    </Link>
  </div>)
}