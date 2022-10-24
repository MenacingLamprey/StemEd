import {Schema, model} from 'mongoose';
import { ITopic } from '../types';

const TopicSchema = new Schema({
  title: { type: String, required: true },
  lessons : [{type : Schema.Types.ObjectId, ref : 'lesson'}],
  topicDescription : { type: String, required: true },
  topicExam : [{type : Schema.Types.ObjectId, ref : 'exercise'}],
  background : { type: String, required: true },
});

export const Topic = model<ITopic>('topic',TopicSchema);