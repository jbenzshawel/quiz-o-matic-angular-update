import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Common }            from '../../classes/common';
import { QuizResult }        from '../../classes/quiz-result';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  quizResult: QuizResult = null;
  private _common: Common; 

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._common = new Common();
    this.quizResult = new QuizResult();

    this._activatedRoute.params.subscribe(params => {
      this._setResult(params["id"]);
    });
  }

  private _setResult(id:string): void {
    let storageResultString:string = window.sessionStorage.getItem(this.quizResult.storageKey.concat(id));
    let parsedStorageResult:any = this._common.parseJsonObject(storageResultString);

    if (this._common.hasProperties(parsedStorageResult, ["title", "content"])) {
      this.quizResult.title = parsedStorageResult.title;
      this.quizResult.content = parsedStorageResult.content;
      //this.quizResult.imagePath = parsedStorageResult.imagePath;
    }
  }
}
