import { Component } from '@angular/core';
import { NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userLoggedIn:Boolean = false;
  title = 'Client';
  Admin:boolean = false;
}
