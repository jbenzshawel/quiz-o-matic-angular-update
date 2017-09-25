import { Component, OnInit } from '@angular/core';
import { Quiz }              from '../../interfaces/quiz';
import { DataService }       from '../../services/data.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  id:string;
  quizList:Quiz[];

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this._getQuizData();
  }

  private _getQuizData(): void {
    this._dataService.getQuizes()
      .subscribe(quizes => {
        this.quizList = quizes;
      }); // end subscribe callback
  }
}
