import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    isAdmin: false
  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const userJSON = JSON.stringify(this.user);
    this.auth.registerUser(userJSON).subscribe(result => {
      console.log(this.auth.isLoggedIn());
      this.router.navigate(['/tests']);
    }, err => {
      console.log(err);
    });
  }

}
