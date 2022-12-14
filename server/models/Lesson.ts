import { Schema, model} from 'mongoose';
import { ILesson } from '../types';

const LessonSchema = new Schema({
  title: { type: String, required: true },
  summary : { type: String, required: true },
  videoUrls : [{type : String}],
  exercises : [{type : Schema.Types.ObjectId, ref : 'exercise'}],
  exerciseformats : [{type : Schema.Types.ObjectId, ref : 'exerciseFormat'}],
  background : String
});
  
export const Lesson = model<ILesson>('lesson', LessonSchema);