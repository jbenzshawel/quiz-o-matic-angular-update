import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule }                from '@angular/core';
import { HttpClientModule }        from '@angular/common/http';
import { RouterModule, Routes }    from '@angular/router';
import { FormsModule }             from '@angular/forms';
import { MdButtonModule,
         MdDialogModule }          from '@angular/material';

import { LoggerService }           from './services/logger.service';
import { DataService }             from './services/data.service';
import { QuizEngineService }       from './services/quiz-engine.service';

import { AppComponent }            from './app.component';
import { MessageDialogComponent }  from './components/dialogs/message-dialog.component';
import { HomeComponent }           from './components/home/home.component';
import { PageNotFoundComponent }   from './components/page-not-found/page-not-found.component';
import { QuizListComponent }       from './components/quiz-list/quiz-list.component';
import { TakeQuizComponent }       from './components/take-quiz/take-quiz.component';
import { QuizResultComponent }     from './components/quiz-result/quiz-result.component';

/////////////////////////////////////////////////////////////////////////
/// App Routes
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz/list', component: QuizListComponent },
  { path: 'quiz/take/:id', component: TakeQuizComponent },
  { path: 'quiz/result/:id', component: QuizResultComponent },
  { path: '**', component: PageNotFoundComponent }
];

////////////////////////////////////////////////////////////////////////
/// Angular Material 
@NgModule({
  exports: [
    MdButtonModule,
    MdDialogModule
  ]
})
export class AppMaterialModule {}

////////////////////////////////////////////////////////////////////////
/// App Module
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppMaterialModule,
    RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [
    AppComponent,
    MessageDialogComponent,
    HomeComponent,
    PageNotFoundComponent,
    QuizListComponent,
    TakeQuizComponent,
    QuizResultComponent
  ],
  entryComponents: [
    MessageDialogComponent
  ],
  providers: [
    LoggerService,
    DataService,
    QuizEngineService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
