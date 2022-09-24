export interface IExercise {
  question:string;
  answers :string[];
  _id : string;
}

export interface constant {
  [key: string]: string
}

export interface IExerciseFormat {
  questionTemplate:string;
  variables:string[];
  answers :string[];
  constants? : constant[];
  symbols?: string[];
  _id : string;
}

export interface ILesson {
  title : string;
  _id? : string;
  summary: string;
  videoUrls :string[];
  exercises : IExercise[];
  exerciseFormats? : IExerciseFormat[];
}

export interface ITopic {
  title : string;
  _id? : string;
  background : string;
  topicDescription :string;
  lessons : ILesson[];
  topicExam :IExercise[];
}

export interface ISubject {
  title : string;
  _id : string;
  topics : ITopic[];
}