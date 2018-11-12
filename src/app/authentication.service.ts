import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'x-auth-token' }, )
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerApi = '/api/users';
  loginApi = '/api/auth';
  private token: string;

  constructor(private http: HttpClient) { }

  private saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('auth-token');
    }
    return this.token;
  }

  public getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  registerUser(user): Observable<any> {
    return this.http.post(this.registerApi, user, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json'),
        observe: 'response'
      }).pipe(map(res => {
        this.saveToken(res.headers.get('x-auth-token'));
      }));
  }

  loginUser(user): Observable<any> {
    return this.http.post(this.loginApi, user, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json'),
      observe: 'response'
    }).pipe(map(res => {
      this.saveToken(res.headers.get('x-auth-token'));
    }));
  }
}
