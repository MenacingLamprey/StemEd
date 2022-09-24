import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ISubject } from "../../ApiResponseTypes"
import { getSubjects } from "../../ApiServices"
import { Subject } from '../Subject/index'

import './styles.css'
const initialSubject : ISubject = {title: '', topics :[], _id:''}

export const LandingPage = () => {
  const [subjects, setSubjects] = useState([initialSubject])

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