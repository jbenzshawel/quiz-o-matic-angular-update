import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpClientModule }     from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { LoggerService }        from './services/logger.service';
import { DataService }          from './services/data.service';

import { AppComponent }         from './app.component';
import { HomeComponent } from './component/home/home.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
