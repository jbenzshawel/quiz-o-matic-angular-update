import { Component, 
         OnInit,
         OnDestroy }              from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog }               from '@angular/material';
import { MessageDialogComponent } from '../dialogs/message-dialog.component'; 
import { Quiz }                   from '../../interfaces/quiz';
import { Question }               from '../../interfaces/question';
import { Answer }                 from '../../interfaces/answer';
import { DataService }            from '../../services/data.service';
import { QuizEngineService }      from '../../services/quiz-engine.service'
import { Common }                 from '../../classes/common';
import { QuizResult }             from '../../classes/quiz-result';

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

  private _common: Common; 
  
  constructor(
    public dialog: MdDialog, 
    private _activatedRoute: ActivatedRoute, 
    private _router: Router, 
    private _dataService: DataService, 
    private _quizEngine: QuizEngineService
  ) { }

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
    this._common = new Common();
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
    if (this._validQuizResponse()) {
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

  submitQuiz(event: Event): void {
    event.preventDefault();
    if (this._validQuizResponse()) {
      let responseCopy = JSON.stringify(this.model.response);
      let parsedResponse: any = this._common.parseJsonObject(responseCopy);

      let quizResult = new QuizResult();
      quizResult.content = this._quizEngine.scoreTwoOption(this.currentQuiz, this.answers, this.questions, parsedResponse);  
      //quizResult.imagePath = quizEngine.status ? this.currentQuiz.images.pass : this.currentQuiz.images.fail;
      quizResult.title = `Results: ${this.currentQuiz.name}`;

      window.sessionStorage.setItem(quizResult.storageKey.concat(this.id), JSON.stringify(quizResult));
      
      this._router.navigateByUrl(`/quiz/result/${this.id}`);
    }
  }

  private _setQuizData(quizId:string):void {
    this.id = quizId;
    
    this._dataService.getQuiz(quizId)
      .subscribe(quiz => { 
        quiz.attributes = this._common.parseJsonObject(quiz.attributes.toString());
        this.currentQuiz = quiz
      });

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

            this.answers[i].attributes = this._common.parseJsonObject(this.answers[i].attributes.toString());
            this.questions[index].answers.push(this.answers[i]);
          }
      }
    }); // end for each question
  }

  private _validQuizResponse(): boolean {
    let numberResponses:number = Object.keys(this.model.response).length;

    return numberResponses === this.currentQuestionNumber;
  }
}
