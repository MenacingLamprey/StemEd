import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { ITopic } from '../../ApiResponseTypes'

import './styles.css'
interface IProps {
  topic : ITopic
} 

export const TopicCard : FunctionComponent<IProps> = ({ topic }) => {
  console.log(topic.background)
  return (<div className='topic' style={{ backgroundImage: `url(${topic.background})`  }}>
  <Link id ='topic-link' to={`/topic/${topic.title}`}><h4 className = 'topic-name'>{topic.title}</h4></Link>
    {/* <p className='topic-descript'>{topic.topicDescription}</p> */}
  </div>)
}