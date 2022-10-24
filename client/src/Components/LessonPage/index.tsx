import { useEffect, useState, FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom';

import { Video } from '../Video';
import { getLesson } from '../../ApiServices'
import { ILesson } from '../../ApiResponseTypes'
import { MathJax } from 'better-react-mathjax'

import './styles.css'

const initialLesson: ILesson = { title: '', videoUrls: [], summary: '', exercises: [],background :'' }

export const LessonPage :FunctionComponent<{auth :boolean}> = ( {auth} ) => {
  const [lesson, setLesson] = useState<ILesson>(initialLesson);
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
        console.log(e);
      }
    }
  }

  const parseSummary = (summary :string) => {
    const splitSummary = summary.split('<br>')
    return splitSummary.map(section => <p>{section}</p>)
  }

  return (<div id = 'lesson-page'>
    <h1 id = 'lesson-title'>{lesson.title}</h1>
    <div id = 'summary'><h3><MathJax>{parseSummary(lesson.summary)}</MathJax></h3>
    {lesson.videoUrls.map(url => <Video link = {url}/>)}
    </div>
    <Link id ='practice-link' to={`/exercises/${lesson.title}/`}><div id = 'practice-box'>Practice</div></Link>
  </div>)
}