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

  // this updates by displaying existing data in the test
  editTest(examId, exam): Observable<any> {
    const apiUrlWithId = apiUrl + '/' + examId;
    // http.put, put checks the entry with a given id, then takes out the data at that point and updates the data.
    // put changes everything at a given id
    // patch only changes the selected data at the point
    return this.http.put(apiUrlWithId, exam, httpOptions);
  }

  getDetailTest(examId): Observable<any> {
    const apiUrlWithId = apiUrl + '/' + examId;
    return this.http.get(apiUrlWithId, httpOptions);
  }

  deleteTest(examId): Observable<any> {
    const apiUrlWithId = apiUrl + '/' + examId;
    return this.http.delete(apiUrlWithId, httpOptions);
  }
}

