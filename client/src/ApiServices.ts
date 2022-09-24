import { IExercise, IExerciseFormat, ILesson, ISubject, ITopic } from "./ApiResponseTypes"

const baseURL = "http://localhost:3001"

export const getSubjects = async () : Promise<ISubject[]> => {
  const response = await fetch(`${baseURL}/subjects`)
  const subjects = (await response.json()) as ISubject[]
  return subjects;
}

export const getTopics = async (subject : string) : Promise<ITopic[]> => {
  const response = await fetch(`${baseURL}/${subject}/topics`)
  const topics = (await response.json()) as ITopic[]
  return topics;
}

export const getTopic = async (topicName : string) : Promise<ITopic> => {
  const response = await fetch(`${baseURL}/topic/${topicName}`)
  const topic = (await response.json()) as ITopic
  return topic;
}

export const getLesson = async ( lessonName: string) : Promise<ILesson> => {
  const response = await fetch(`${baseURL}/lesson/${lessonName}`)
  const lesson = (await response.json()) as ILesson
  return lesson;
}

export const getExercisesByLesson = async (lessonName: string) : Promise<IExercise[]> =>{
  const response = await fetch(`${baseURL}/exercises/${lessonName}/`)
  const exercises = (await response.json()) as IExercise[]
  return exercises;
}

export const getExerciseFormatsByLesson = async (lessonName: string) : Promise<IExerciseFormat[]> =>{
  const response = await fetch(`${baseURL}/exerciseFormats/${lessonName}/`)
  const exerciseFormats = (await response.json()) as IExerciseFormat[]
  return exerciseFormats;
}