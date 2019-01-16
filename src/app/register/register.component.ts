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
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
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
      console.log(result);
    }, (error) => {
      this.loading = false;
    });
  }

}
