import { Request, Response} from "express";
import { Subject } from '../models/Subject'
import { ISubject } from '../types'

export const getSubject =  async (req : Request, res : Response) => {
  try {
    const { title } = req?.params
    const subject = await Subject.find({ title }).populate('topics');
    res.status(200).send(subject)
  } catch (e) {
    res.status(500).send({error :true, res : 'Error getting subject'})
  }
}

export const makeSubject =  async (req : Request, res : Response) => {
  try {
    const { newSubject } = req.body;
    const subject = await Subject.create(newSubject);
    res.status(201).send(subject)
  } catch (e) {
    res.status(500).send({error : true, res : 'Error making subject'})
  }
}

export const getAllSubjects =  async (req : Request, res : Response) => {
  try {
    const subjects : ISubject[] = await Subject.find().populate('topics');
    res.status(200).send(subjects)
  } catch (e) {
    res.status(500).send({error :e})
  }
}