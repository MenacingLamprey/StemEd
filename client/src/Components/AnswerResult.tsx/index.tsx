import { useNavigate } from "react-router-dom";
import { FunctionComponent,useState } from "react";
import { ILesson } from "../../ApiResponseTypes";
import { profile, addLesson } from '../../AuthApi'

interface IProps {
  answered :boolean;
  correct :boolean;
  completed :boolean;
  lesson :ILesson;
} 

export const AnswerResult: FunctionComponent<IProps> = (props : IProps) => {
  const [state, setState] = useState([]);
  const { answered, correct, completed, lesson } = props;

  const accessToken = localStorage.getItem('accessToken');

  const alreadyCompleted = (completedLessons : ILesson[]) => {
    const isCompleted = completedLessons.filter( completedLesson =>{
      return completedLesson._id == lesson._id
    }).length > 0
    
    console.log(isCompleted)
    return isCompleted
  }

  const addCompletedLesson = async (accessToken :string ) => {
    const userInfo = await profile(accessToken);
    const { _id, completedLessons } = userInfo
    if (userInfo && !alreadyCompleted(completedLessons)) {
      addLesson(lesson, _id)
    }
  };

  correct && completed && accessToken && addCompletedLesson(accessToken)

  return (<div>
    {!answered ?
    <div/> : !correct ?
     <div>Incorrect, try Again</div> :<div>Correct!</div>}
  </div>)
}