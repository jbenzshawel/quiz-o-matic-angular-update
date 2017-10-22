import { Injectable }    from '@angular/core';
import { Quiz }          from '../interfaces/quiz';
import { Question }      from '../interfaces/question';
import { Answer }        from '../interfaces/answer';

@Injectable()
export class QuizEngineService {
  public quiz: Quiz; 
   answers: Answer[];
   questions: Question[];
   responses: any;
   status: boolean;
  
   constructor() {}

  public scoreTwoOption(quiz: Quiz, answers: Answer[], questions: Question[], responses: any): string {
   this.quiz = quiz;
   this.answers = answers;
   this.questions = questions;
   this.responses = responses;

   let result: string;

   if (this.responses == null || this.responses.length == 0 || this.quiz == null || this.answers == null || this.questions == null) {
    return null;
   }

   // used to keep track of each option select count
   let passCount: number = 0;
   let failCount: number = 0;
   
   if (this.quiz != null && this.quiz.attributes != null) {
    let answerAttribute = this.quiz.attributes["attributeName"];
    let responseKeys = Object.keys(this.responses);
    // loop over responses
    for (let i = 0; i < responseKeys.length; i++) {
     let questionNumber = responseKeys[i];
     let questionAns = this.responses[questionNumber];
     
     // determine which option response falls into          
     this.answers.some((answer) => {
      if (answer.questionId.toString() === questionNumber && answer.identifier === questionAns) {
       if (answer.attributes[answerAttribute]) {
        passCount++;
       } else {
        failCount++;
       }
       return true;       
      } // end if answer matches question 
      return false;      
     });// end some answer   
    } // end for each response
    
    // get pass or fail message for result
    if (passCount + failCount === responseKeys.length) {
      if (passCount > failCount) {
       result = this.quiz.attributes["pass"];
       this.status = true;
      } else {
       result = this.quiz.attributes["fail"];
       this.status = false;
      }
    }
   } // end if this.quiz != null
   
   return result;
  }
}
