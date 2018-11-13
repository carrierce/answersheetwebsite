import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exam Keys';
  constructor(private auth: AuthenticationService) {}

  logOut() {
    this.auth.logOut();
  }
}
