import { Component, 
         OnInit,
         OnDestroy }              from '@angular/core';
import { ActivatedRoute }         from '@angular/router';
import { MdDialog }               from '@angular/material';
import { MessageDialogComponent } from '../dialogs/message-dialog.component'; 
import { Quiz }                   from '../../interfaces/quiz';
import { Question }               from '../../interfaces/question';
import { Answer }                 from '../../interfaces/answer';
import { DataService }            from '../../services/data.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  model: any;
  id: string;
  validForm: boolean = false;
  currentQuiz: Quiz = null;
  currentQuestion: Question = null;
  questions: Question[] = null;
  answers: Answer[] = null;
  activeOption: any;
  totalNumberQuestions: number;
  currentQuestionNumber: number;
  
  constructor(public dialog: MdDialog, private _dataService: DataService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {  
    this.activeOption = {};

    this._activatedRoute.params.subscribe(params => {
      let quizId: string = params["id"];
      this._setQuizData(quizId);
    });

    this.model = {
      quizId: this.id,
      response: {}
    };

    this.currentQuestionNumber = 1;
  }

  ngOnDestroy() {
    this.activeOption = {};
    
    this.model = {
      quizId: this.id,
      response: {}
    };

    this.currentQuiz = null;
    this.currentQuestion = null;
    this.questions = null;
    this.answers = null;
    this.currentQuestionNumber = 1;
  }

  showNextQuestion():void {
    let numberResponses:number = Object.keys(this.model.response).length;
    if (numberResponses === this.currentQuestionNumber) {
      this.currentQuestion = this.questions[this.currentQuestionNumber];
      this.currentQuestionNumber += 1;
      window.scrollTo(0, 0);
    } else {
       this.openInvalidResponseDialog();
    }
  }

  openInvalidResponseDialog(): void {
    let dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '400px',
      data: { 
        title : 'Invalid Response',
        content : 'Please select a response',
        closeButtonText : 'OK'
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.scrollTo(0, 0);
    });
  }

  private _setQuizData(quizId:string):void {
    this.id = quizId;
    
    this._dataService.getQuiz(quizId)
      .subscribe(quiz => this.currentQuiz = quiz);

    this._dataService.getQuestions(quizId)
      .subscribe(questions => {
        this.questions = questions;
        this.totalNumberQuestions = questions.length;

        this._dataService.getAnswers(quizId)
          .subscribe(answers => {
            this.answers = answers;
            this._mapAnswersToQuestions();
            this.currentQuestion = questions[0];
          });
      });
  }

  private _mapAnswersToQuestions():void {
    // loop over each question and set its answers property
    this.questions.forEach((question, index) => {
      for (var i = 0; i < this.answers.length; i++) {
          if (question.id === this.answers[i].questionId) {
            if (typeof(this.questions[index].answers) === "undefined") {
              this.questions[index].answers = [];
            }
            
            this.questions[index].answers.push(this.answers[i]);
          }
      }
    }); // end for each question
  }
}
