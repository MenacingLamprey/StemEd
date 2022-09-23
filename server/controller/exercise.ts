import { Request, Response} from "express";
import { Exercise } from '../models/Exercise'
import { Lesson } from "../models/Lesson";
import { IExercise, ILesson} from '../models/types'

export const getExercise =  async (req : Request, res : Response) => {
  try {
    const id = req?.params?.id;
    const topic = await Exercise.findById(id);
    res.status(200).send(topic)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const makeExercise =  async (req : Request, res : Response) => {
  try {
    const newExercise : IExercise = req.body;
    const exercise : IExercise = await Exercise.create(newExercise);
    res.status(201).send(exercise)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const getExercisebyLesson = async (req:Request, res :Response) => {
  try {
    const lessonTitle = req.params.lessonName
    const lesson :ILesson | null = await Lesson.findOne({ title : lessonTitle }).populate('exercises')
    if (lesson) {
      const exercises = lesson.exercises
      res.status(201).send(exercises)
    }
  } catch (e) {
    res.status(500).send({error :e})
  }

}