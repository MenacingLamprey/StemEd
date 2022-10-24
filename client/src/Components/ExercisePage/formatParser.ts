import { constant } from '../../ApiResponseTypes'

interface ITemplate {
  questionTemplate : string;
  answers : string[];
  variables :string[];
  constants? :constant[];
} 

export const formatParser = (template :ITemplate) : [string, string[]] => {
  let { questionTemplate, answers, variables, constants } = template;
  for (const variable of variables){
    const rand = Math.floor(20*Math.random()+1)
    questionTemplate = questionTemplate.replaceAll(variable, rand.toString())
    answers = answers.map(answer => answer.replaceAll(variable, rand.toString()))
  }
  
  constants?.forEach((object)=> {
    const constant =  Object.keys(object)[0]
    const value = object[constant]
    answers = answers.map(answer =>answer.replaceAll(constant, value));
  })

  answers = answers.map(answer => (Math.round(eval(answer) * 100) / 100).toString())
  return [questionTemplate, answers]
}
