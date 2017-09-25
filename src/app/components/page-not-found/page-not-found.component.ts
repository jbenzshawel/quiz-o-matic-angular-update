import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  requestedURL:string;

  constructor() { }

  ngOnInit() {
    this.requestedURL = window.location.pathname;
  }
}
