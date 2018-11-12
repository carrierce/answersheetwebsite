import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user = {
        email: '',
        password: ''
    };
    constructor(private auth: AuthenticationService, private router: Router) { }

    ngOnInit() {}

    onSubmit() {
        const userJSON = JSON.stringify(this.user);
        this.auth.loginUser(userJSON).subscribe(
            result => {
                console.log(this.auth.isLoggedIn());
                this.router.navigate(['/tests']);
            },
            err => {
                console.log(err);
            }
        );
    }
}
