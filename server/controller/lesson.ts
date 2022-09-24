import { Request, Response} from "express";
import { Lesson } from '../models/Lesson'
import { ILesson } from '../types'

export const getLesson =  async (req : Request, res : Response) => {
  try {
    const title = req?.params?.title;
    const lesson = await Lesson.findOne({title}).populate('exercises');
    res.status(200).send(lesson)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const makeLesson =  async (req : Request, res : Response) => {
  try {
    const newLesson : ILesson = req.body;
    const lesson = await Lesson.create(newLesson);
    res.status(201).send(lesson)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

