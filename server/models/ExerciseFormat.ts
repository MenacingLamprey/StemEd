import { Schema, model} from 'mongoose';
import { IExerciseFormat } from '../types'

const ExerciseFormatSchema = new Schema({
  questionFormat: { type: String, required: true },
  questionImg : String,
  answers : [{ type: String, required: true }],
  variables : [{type : String}],
  symbols : [{type : String}],
  constants : [{
    type: Map,
    of: String
  }]
});

export const ExerciseFormat = model<IExerciseFormat>('exerciseFormat',ExerciseFormatSchema);