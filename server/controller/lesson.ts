import { Request, Response} from "express";
import { Lesson } from '../models/Lesson'

export const getLesson =  async (req : Request, res : Response) => {
  try {
    const title = req?.params?.title;
    const lesson = await Lesson.findOne({title}).populate('exercises');
    res.status(200).send(lesson)
  } catch (e) {
    res.status(500).send({error : true , res : 'Error getting lesson'})
  }
}

export const getLessonbyId =  async (req : Request, res : Response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);
    res.status(200).send(lesson);
  } catch (e) {
    res.status(500).send({error :true, res :'Error getting lesson'});
  }
}

export const makeLesson = async (req : Request, res : Response) => {
  try {
    const { newLesson }  = req.body;
    const lesson = await Lesson.create(newLesson);
    res.status(201).send(lesson)
  } catch (e) {
    res.status(500).send({error : true, res :'Error making lesson'})
  }
}

export const addExerciseToLesson = async (req : Request, res :Response) => {
  try {
  const { exerciseId, lessonId } = req.body
  const lesson = await Lesson.updateOne({_id : lessonId}, { $push: {exercises : exerciseId } })
  res.status(201).send({error : false, res : "Exercise added successfully" })
  } catch (e) {
    res.status(500).send({error :true, res : "Error adding exercise to lesson"})
  }
}