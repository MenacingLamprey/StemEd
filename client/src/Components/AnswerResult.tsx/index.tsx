import { useNavigate } from "react-router-dom";

export const AnswerResult = (props:any) => {
  const navigate = useNavigate()
  const { answered, correct, nextQuestion} = props;
  console.log(correct)
  return (<div>
    {!answered ?
    <div/> : !correct ?
     <div>Incorrect, try Again</div> : !nextQuestion ? <div>Correct!</div> : <div>InCorrect</div>}
  </div>)
}