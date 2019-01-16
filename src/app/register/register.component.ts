import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  // user = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   isAdmin: false
  // };
  success = false;
  loading = false;
  constructor(
      private fb: FormBuilder,
      private auth: AuthenticationService,
      private router: Router,
      private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get userName() {
    return this.userForm.get('userName');
  }

  get userEmail() {
    return this.userForm.get('userEmail');
  }

  get userPassword() {
    return this.userForm.get('userPassword');
  }


  submitHandler() {
    this.loading = true;
    const rawValue = this.userForm.value;
    const jsonValue = JSON.stringify(rawValue);
    this.auth.registerUser(jsonValue).subscribe((result) => {
      this.loading = false;
      this.success = true;
      this.dialog.open(SuccessDialogComponent);
      this.router.navigate(['/tests']);
      console.log(result + ' this is the result');
    }, (error) => {
      this.loading = false;
    });
  }

  // onSubmit() {
  //   const userJSON = JSON.stringify(this.user);
  //   this.auth.registerUser(userJSON).subscribe(result => {
  //     console.log(this.auth.isLoggedIn());
  //     this.router.navigate(['/tests']);
  //   }, err => {
  //     console.log(err);
  //   });
  // }

}
