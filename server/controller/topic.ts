import { Request, Response} from "express";
import { Topic } from '../models/Topic'

import { ITopic } from "../types";

export const getTopic =  async (req : Request, res : Response) => {
  try {
    const { title } = req?.params;
    const topic = await Topic.findOne({ title }).
    populate('lessons').
    populate('topicExam')
    res.status(200).send(topic)
  } catch (e) {
    res.status(500).send({error :true , res : 'Error getting Topic'})
  }
}

export const getAllTopics =  async (req : Request, res : Response) => {
  try {
    const topics : ITopic[] = await Topic.find()
    console.log(topics[0])
    res.status(200).send(topics)
  } catch (e) {
    res.status(500).send({error :e})
  }
}

export const makeTopic =  async (req : Request, res : Response) => {
  try {
    const { newTopic } = req.body;
    const topic = await Topic.create(newTopic);
    res.status(201).send(topic)
  } catch (e) {
    res.status(500).send({error :true, res : 'Error making topic'})
  }
}