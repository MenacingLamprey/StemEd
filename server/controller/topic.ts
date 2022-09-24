import { Request, Response} from "express";
import { Topic } from '../models/Topic'
import { ITopic } from '../types'

export const getTopic =  async (req : Request, res : Response) => {
  try {
    const title = req?.params?.title;

    const topic = await Topic.findOne({ title }).
    populate('lessons').
    populate('topicExam')

    res.status(200).send(topic)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const makeTopic =  async (req : Request, res : Response) => {
  try {
    const newTopic : ITopic = req.body;
    const topic : ITopic = await Topic.create(newTopic);
    res.status(201).send(topic)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const getSubjectTopics = async (req : Request, res : Response) => {
  
  return null;
}