export interface IExercise {
  question: string;
  questionImg? : string;
  answer : string[];
  _id? : string;
}

export interface constant {
  [key: string]: string
}

export interface IExerciseFormat {
  questionFormat: string;
  variables :string[];
  answerFormat : string[];
  constants : constant[]
  questionImg? : string;
  _id? : string;
}

export interface ILesson {
  title: string;
  summary : string;
  videoUrls : string[];
  exercises : IExercise[];
  exerciseformats : IExercise[];
  _id? : string;
}

export interface ITopic {
  title: string;
  topicDescription : string,
  background : string;
  lessons : ILesson[];
  topicExam? : IExercise[];
  _id? : string;
}

export interface ISubject {
  title: string;
  topics : ITopic[];
  _id? : string
}