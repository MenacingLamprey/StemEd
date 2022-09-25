import { useEffect, useState }  from "react"
import { useParams } from "react-router-dom";

import { getTopic } from '../../ApiServices'
import { ITopic } from "../../ApiResponseTypes"
import { LessonCard } from '../LessonCard/index'

import './styles.css'

let initialTopic : ITopic ={title :'', topicDescription:'', lessons:[], topicExam :[],background:''}

export const TopicPage= () => {
  const [topic, setTopic] = useState(initialTopic)

  const { title } = useParams();

  useEffect(() => {
    getTopicPage()
  },[])

  const getTopicPage =  async () =>{
    if(title){
      const data = await getTopic(title)
      setTopic(data)
    }
  } 

  return (<div id = 'topic-page'>
    <h1>{topic.title}</h1>
    <h3>{topic.topicDescription}</h3>
    <div id = 'lesson-container'>
      <h3 id ='lesson-header'>Lessons</h3>
      <div id = 'lessons'>
        {topic.lessons.map(lesson => <LessonCard lesson ={lesson} />)}
      </div>
    </div>
  </div>)
}