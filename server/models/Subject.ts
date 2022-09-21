import {Schema, model} from 'mongoose';
import { ISubject } from './types'

const SubjectSchema = new Schema({
  title: { type: String, required: true },
  topics : [{type : Schema.Types.ObjectId, ref : 'topic'}]
});

export const Subject =  model<ISubject>('subject',SubjectSchema);