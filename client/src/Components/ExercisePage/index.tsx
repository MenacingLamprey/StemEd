import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { MathJax } from 'better-react-mathjax'
import { getExercisesByLesson, getExerciseFormatsByLesson, getLesson } from "../../ApiServices";
import { IExercise, ILesson } from "../../ApiResponseTypes"
import { formatParser } from "./formatParser";

import './styles.css'
import { AnswerResult } from "../AnswerResult.tsx";

const initialLesson : ILesson = {title :'', summary:'', videoUrls :[], exercises:[], background :''} 

export const ExercisePage  = () => {
  const [index,setIndex ] = useState(0);
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const [answers ,setAnswers] = useState<string[]>([]);
  const [answered,setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false)
  const [lessonData, setLesson] = useState<ILesson>(initialLesson);

  const { lesson } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getExercises();
    getLessonData();
  },[])

  const getLessonData = async () => {
    if(lesson){
      try {
      const data = await getLesson(lesson)
      setLesson(data)
      } catch (e) {
        console.log(e)
      }
    }
  }
  
  const getExercises = async () => {
    if(lesson){
      const data = await getExercisesByLesson(lesson)
      const formats = await getExerciseFormatsByLesson(lesson)
      const formatedExercises :IExercise[] = []

      while(formatedExercises.length < 3 && formats.length){
        for (const format of formats){ 
          const [question, answers] = (formatParser(format))
          const newExercise = {question, answers ,_id: '-1'} as IExercise
          formatedExercises.push(newExercise)
        }
      }
      setExercises([...data, ...formatedExercises])
    }
  }

  const isCorrect = () => {
    if(exercises[index]){
      const masterAnswers = exercises[index].answers
      const numCorrect = answers.filter((answer,index) => answer == masterAnswers[index]).length
      return numCorrect == masterAnswers.length;
    }
    return false
  }

  const onSubmit = (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAnswered(true);
    if (isCorrect()) {
      setIndex(index+1)
      setCorrect(true)
      setAnswers([])
    } else {
      setCorrect(false)
    }
  }
  //used if there are multiple answers to a question
  const generateInputs = () => {
    return (<div>
    {exercises[index].answers.map((answer,index) => <input 
      type="text" 
      className="answer-input"
      value={answers}
      placeholder=""
      onChange={(e) => { 
        answers[index] = e.target.value
        setAnswers([...answers])}
      }
    />)}
    </div>)
  }

  //render user input in Latex
  const displayAnswerLaTex = () => {
    //prevent carot from displaying error
    const valid = (answer : string) => {
      return (answer.slice(-1) !== '^')
    }

    return (<div>
      {answers.map(answer => 
      <MathJax>{`\\(${valid(answer) ? answer: answer.slice(0,-1)}\\)`}</MathJax>)} 
      </div>
    )
  }

  return (<div id ='exercise-container'> 
    {!exercises.length ? <div>Loading</div> :
      exercises[index] ? 
      <div id = 'exercise'>
        <h4 id = 'question'><MathJax>{exercises[index].question}</MathJax></h4>
        <AnswerResult answered = {answered} correct ={correct} completed ={!exercises[index+1]} lesson ={lessonData}/>
        <div>
        {displayAnswerLaTex()}
        </div>
        <form id = 'answer-form' onSubmit={e => onSubmit(e) }>
          {generateInputs()}
          <button type ='submit'> submit </button>
        </form>
      </div> : 
      (<div id = 'success'>All Exercises for This Lesson Complete
        <button onClick={() => navigate(-2)}>Back to Topic</button>
      </div>)}
    </div> )
}