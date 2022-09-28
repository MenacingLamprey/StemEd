import { useEffect, useState, FunctionComponent } from "react"
import { ISubject } from "../../ApiResponseTypes"
import { getSubjects } from "../../ApiServices"
import { Subject } from '../Subject/index'

import './styles.css'
const initialSubject : ISubject = {title: '', topics :[], _id:''}
interface IProps {
  isAuthenticated :boolean
  setIsAuthenticated : Function
 } 


export const LandingPage :FunctionComponent<IProps>= ({isAuthenticated, setIsAuthenticated}) => {
  const [subjects, setSubjects] = useState<ISubject[]>([initialSubject])

  useEffect(() =>{
    loadSubjects();
  },[])

  const loadSubjects = async () =>{
    const subjects : ISubject[] = await getSubjects();
    setSubjects(subjects)
  }

  return (<div id = 'subject-container'>
    {subjects.map(subject => <Subject subject ={subject}/>)}
  </div>)

} 