import { Injectable }    from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable }    from 'rxjs';
import { LoggerService } from './logger.service';
import { Common }        from '../classes/common';
import { Quiz }          from '../interfaces/quiz';
import { Question }      from '../interfaces/question';
import { Answer }        from '../interfaces/answer';

@Injectable()
export class DataService {

  private _baseUrl: string = "//localhost:5000/api";

  private _common: Common;

  private _logger: LoggerService;

  constructor(private _http: HttpClient) 
  { 
    this._common = new Common();
    this._logger = new LoggerService();
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
      this._logger.error(`Invalid getQuiz parameter in DataService. quizId '${quizId}' should be a Guid.`)
      return null;
    }

    return this._http.get<Quiz>(`${this._baseUrl}/quizes/${quizId}`)
  }

  public getQuestions(quizId: string): Observable<Question[]> {
    if (!this._common.isGuid(quizId)) {
      this._logger.error(`Invalid getQuestions parameter in DataService. quizId '${quizId}' should be a Guid.`)      
      return null;
    }

    return this._http.get<Question[]>(`${this._baseUrl}/questions/list/${quizId}`);
  }

  public getAnswers(quizId: string,  includeActive: boolean = false): Observable<Answer[]> {
    if (!this._common.isGuid(quizId)) {
      this._logger.error(`Invalid getAnswers parameter in DataService. quizId '${quizId}' should be a Guid.`)
      return null;
    }
    
    let apiEndpoint:string = `${this._baseUrl}/answers/list/${quizId}`;
    if (includeActive) { apiEndpoint = `${apiEndpoint}/true`; }

    return this._http.get<Answer[]>(apiEndpoint);
  }
}
