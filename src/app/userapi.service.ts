import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = '/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getUsers(): Observable<any> {
    return this.http.get(apiUrl, httpOptions);
  }

  getSingleUser(id): Observable<any> {
    const getUser = apiUrl + '/' + id;
    return this.http.get(getUser, httpOptions);
  }

  postUser(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions);
  }

  deleteUser(id): Observable<any> {
    const deleteUserUrl = apiUrl + '/' + id;
    console.log(deleteUserUrl);
    return this.http.delete(deleteUserUrl, httpOptions);
  }

  toggleUserAdminStatus(userId, updatedAdminStatus): Observable<any> {
    const apiUrlWithId = apiUrl + '/' + userId;
    return this.http.put(apiUrlWithId, updatedAdminStatus, {
        headers: new HttpHeaders()
                .set('x-auth-token', this.auth.getToken())
                .set('Content-Type', 'application/json')
        });
  }

}
