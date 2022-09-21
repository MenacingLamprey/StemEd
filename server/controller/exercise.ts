import { Request, Response} from "express";
import { Exercise } from '../models/Exercise'
import { IExercise} from '../models/types'

export const getTopic =  async (req : Request, res : Response) => {
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