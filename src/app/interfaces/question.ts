import { Answer } from './answer';

export interface Question {
    id:number,
    title:string,
    attributes:object,
    quizId:string,
    answers: Answer[]
}
