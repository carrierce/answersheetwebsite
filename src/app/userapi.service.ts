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

  toggleUserAdminStatus(i, users): Observable<any> {
    users[i].isAdmin = !users[i].isAdmin;
    const apiUrlWithId = apiUrl + '/' + users[i]._id;
    const toggledUser = users[i];
    return this.http.put(apiUrlWithId, toggledUser, {
      headers: new HttpHeaders()
              .set('x-auth-token', this.auth.getToken())
              .set('Content-Type', 'application/json')
      });
  }
  // this function takes the index of the given user clicked on &
  // the entire users array (COULD THIS BE OPTIMIZED?)
  // then it takes the users object at position i and toggles its isAdmin status.
  // then it takes concatenates a specific URL for a specific user taking the apiUrl
  // and the id of userobject at position i.
  // then it converts users[i] is on a const to be passed on
  // then it returns an http.put with 1st the endpoint url, the userdata (toggledUser)
  // and the required headers.
  //
}
