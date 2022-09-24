import { Link } from "react-router-dom"

import { ISubject, ITopic } from "../../ApiResponseTypes"
import { TopicCard } from "../TopicCard"

import './styles.css'

type IProp = {
  subject : ISubject
}

export const Subject = ( props :IProp ) => {
  const { subject } = props
  const { title, topics } = subject;
  return <div className = 'subject'>
   <Link id = 'sub-link' to ={''} ><h1 id = 'sub-title'>{title}</h1></Link>
    <div id = 'topics'>
      {subject.topics.map((topic)  => <TopicCard topic ={topic}/>)}
    </div>
  </div>
}