import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = '/api/exams';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getTests(): Observable<any> {
    return this.http.get(apiUrl, httpOptions);
  }

  postTest(exam): Observable<any> {
    return this.http.post(apiUrl, exam, httpOptions);
  }
}

