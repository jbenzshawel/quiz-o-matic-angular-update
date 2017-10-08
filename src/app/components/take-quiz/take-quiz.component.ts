import { Component, OnInit }      from '@angular/core';
import { MdDialog }               from '@angular/material';
import { MessageDialogComponent } from '../dialogs/message-dialog.component'; 
import { Quiz }                   from '../../interfaces/quiz';
import { Question }               from '../../interfaces/question';
import { Answer }                 from '../../interfaces/answer';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit {
  model: any;
  id: string;
  validForm: boolean;
  currentQuiz: Quiz;
  currentQuestion: Question;
  currentAnswer: Answer;
  activeOption: any;
  totalNumberQuestions: number;
  currentQuestionNumber: number;
  
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
    this.model = {
      quizId: this.id,
      response: {}
    };    
    this.activeOption = {};
  }

  showNextQuestion():void {
    let numberResponses:number = Object.keys(this.model.response).length;
    if (numberResponses === this.currentQuestionNumber) {
       this.currentQuestionNumber += 1;
        window.scrollTo(0, 0);
    } else {
       // $("#no-response-modal").modal("show");
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: { 
        title : 'Invalid Response',
        content : 'Please select a response',
        closeButtonText : 'OK'
       }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
