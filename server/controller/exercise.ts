import { Request, Response} from "express";
import { Exercise} from '../models/Exercise'
import { Lesson } from "../models/Lesson";

export const getExercise =  async (req : Request, res : Response) => {
  try {
    const { id } = req?.params;
    const topic = await Exercise.findById(id);
    res.status(200).send(topic);
  } catch (e) {
    res.status(500).send({error :true, res : 'Error getting exercise'});
  }
}

export const makeExercise =  async (req : Request, res : Response) => {
  try {
    const { newExercise } = req.body;
    const exercise = await Exercise.create(newExercise);
    res.status(201).send(exercise);
  } catch (e) {
    res.status(500).send({error : true, res : 'Error making exercise'});
  }
}

export const getExercisebyLesson = async (req:Request, res :Response) => {
  try {
    const { lessonName } = req.params
    const lesson = await Lesson.findOne({ title : lessonName }).populate('exercises')
    if (lesson) {
      const exercises = lesson.exercises
      res.status(201).send(exercises)
    }
  } catch (e) {
    res.status(500).send({error :true, res : 'Error getting exercises'})
  }
}

export const getExerciseFormatsbyLesson = async (req:Request, res :Response) => {
  try {
    const { lessonName } = req.params
    const lesson  = await Lesson.findOne({ title : lessonName }).populate('exerciseformats','')

    if (lesson) {
      const { exerciseformats } = lesson
      res.status(201).send(exerciseformats)
    } else {
      res.status(404).send({message: 'Lesson Does Not Exist' })
    } 
  } catch (e) {
    res.status(500).send({error :true, res : 'Error getting exercise formats'})
  }

}