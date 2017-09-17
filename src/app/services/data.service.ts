import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Common }     from '../classes/common';
import { Quiz }       from '../interfaces/quiz';

@Injectable()
export class DataService {

  private _baseUrl: string = "//localhost:5000/api";

  private _common: Common; 

  constructor(private _http: HttpClient) 
  { 
    this._common = new Common();
  }

  ///////////////////////////////////////////////////////////////
  /// GET Methods

  // ToDo: add pagination 
  // gets a list of quizes from the database
  public getQuizes():Observable<Quiz[]> {
    return this._http.get<Quiz[]>(`${this._baseUrl}/quizes/list`);
  }

  // gets a quiz by id
  public getQuiz(quizId: string):Observable<Quiz> {
    if (!this._common.isGuid(quizId)) {
      // ToDo: Hook up logger here
      return null;
    }

    return this._http.get<Quiz>(`${this._baseUrl}/quizes/list/${quizId}`)
  }
}
