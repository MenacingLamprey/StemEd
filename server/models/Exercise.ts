import { Schema, model} from 'mongoose';
import { IExercise } from './types'

const ExerciseSchema = new Schema({
  question: { type: String, required: true },
  questionImg : String,
  answer : { type: String, required: true },
});

export const Exercise = model<IExercise>('exercise',ExerciseSchema);