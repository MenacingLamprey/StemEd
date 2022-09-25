import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import {MathJax} from 'better-react-mathjax'
import { getExercisesByLesson, getExerciseFormatsByLesson } from "../../ApiServices";
import { IExercise, IExerciseFormat } from "../../ApiResponseTypes"
import { formatParser } from "./formatParser";

import './styles.css'

export const ExercisePage  = () => {
  const [index,setIndex ] = useState(0);
  const [exercises, setExercises] = useState([] as IExercise[]);
  const [exerciseFormats, setFormats] = useState([] as IExerciseFormat[]);
  const [answers ,setAnswer] = useState([]as string[]);
  const [answered,setAnswered] = useState(false);

  const { lesson } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getExercises();
  },[])

  const getExercises = async () => {
    if(lesson){
      const data = await getExercisesByLesson(lesson)
      const formats = await getExerciseFormatsByLesson(lesson)
      const formatedExercises :IExercise[] =[]
      while(formatedExercises.length <10 && formats.length){
        for (const format of formats){ 
          const [q,a] = (formatParser(formats[0]))
          const newExercise = {question: q, answers: a ,_id:'1'} as IExercise
          formatedExercises.push(newExercise)
        }
      }
      setExercises([...data, ...formatedExercises])
    }
  }

  const isCorrect = () => {
    const masterAnswers = exercises[index].answers
    const numCorrect = answers.filter((answer,index) => answer == masterAnswers[index]).length
    return numCorrect == masterAnswers.length;
  }

  const onSubmit = (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCorrect()) {
      setIndex(index+1)
      setAnswer([])
    }
  }

  const generateInputs = () => { //used if there are multiple answers to a question
    return (<div>
    {exercises[index].answers.map((answer,index) => <input 
      type="text" 
      className="answer-input"
      value={answers}
      placeholder=""
      onChange={(e) => { 
        answers[index] = e.target.value
        setAnswer([...answers])}
      }
    />)}
    </div>)
  }

  const displayAnswerLaTex = () => {
    const valid = (answer : string) => answer.slice(-1) !== '^'
    return (<div>
      {answers.map(answer => 
      <MathJax>{`\\(${valid(answer) ? answer: answer.slice(0,-1)}\\)`}</MathJax>)}
      </div>)
}

  return (<div id ='exercise-container'> 
    {!exercises.length ? <div>Loading</div> :
      exercises[index] ? 
      <div id = 'exercise'>
        <h4 id = 'question'><MathJax>{exercises[index].question}</MathJax></h4>
        <div>
        {displayAnswerLaTex()}
        </div>
        <form id = 'answer-form' onSubmit={e => onSubmit(e) }>
          {generateInputs()}
          <button type ='submit'> submit </button>
        </form>
      </div> : 
      (<div>All Exercises for This Lesson Complete
        <button onClick={() => navigate(-2)}>Back to Topic</button>
      </div>)}
    </div> )
}