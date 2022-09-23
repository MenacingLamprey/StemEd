import { Request, Response} from "express";
import { Subject } from '../models/Subject'
import { ISubject } from '../models/types'

export const getSubject =  async (req : Request, res : Response) => {
  try {
    const title = req?.params?.title;
    const subject = await Subject.find({ title });
    
    res.status(200).send(subject)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const makeSubject =  async (req : Request, res : Response) => {
  try {
    const newSubject : ISubject = req.body;
    const subject = await Subject.create(newSubject);
    res.status(201).send(subject)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const getAllSubjects =  async (req : Request, res : Response) => {
  try {
    const subjects : ISubject[] = await Subject.find().populate({path : 'topics'})
    res.status(200).send(subjects)
  } catch (e) {
    res.status(500).send({error :e})
  }
}