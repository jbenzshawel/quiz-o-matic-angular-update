import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { HttpClientModule }      from '@angular/common/http';
import { RouterModule, Routes }  from '@angular/router';
import { MdButtonModule }        from '@angular/material';

import { LoggerService }         from './services/logger.service';
import { DataService }           from './services/data.service';

import { AppComponent }          from './app.component';
import { HomeComponent }         from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QuizListComponent }     from './components/quiz-list/quiz-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz/list', component: QuizListComponent },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    QuizListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MdButtonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    LoggerService,
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
