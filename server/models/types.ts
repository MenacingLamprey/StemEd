export interface IExercise {
  question: String;
  questionImg? : String;
  answer : String;
  _id? : String;
}

export interface ILesson {
  title: String;
  summary : String;
  videoUrls : String[];
  exercises? : IExercise[];
  _id? : String;
}

export interface ITopic {
  title: String;
  lessons : ILesson[];
  topicExam? : IExercise[];
  _id? : String;
}

export interface ISubject {
  title: String;
  topics : ITopic[];
  _id? : String
}