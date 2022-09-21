import { Request, Response} from "express";
import { Lesson } from '../models/Lesson'
import { ILesson } from '../models/types'

export const getLesson =  async (req : Request, res : Response) => {
  try {
    const id = req?.params?.id;
    const lesson = await Lesson.findById(id);
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

