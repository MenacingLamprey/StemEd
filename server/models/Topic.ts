import {Schema, model} from 'mongoose';
import { ITopic } from './types';

const TopicSchema = new Schema({
  title: { type: String, required: true },
  lessons : [{type : Schema.Types.ObjectId, ref : 'lesson'}],
  topicExam : [{type : Schema.Types.ObjectId, ref : 'exercise'}]
});

export const Topic = model<ITopic>('topic',TopicSchema);