import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exam Keys';
  // loggedInUser = '';
  constructor(public auth: AuthenticationService) {}

  logOut() {
    this.auth.logOut();
  }

  isAdmin() {
    this.auth.getAdminStatus().subscribe(res => {
      console.log(res.isAdmin);
    });
  }
}
