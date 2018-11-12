import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'x-auth-token'
    })
};

const apiUrl = '/api/exams';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
        private auth: AuthenticationService
    ) {}

    getTests(): Observable<any> {
        return this.http.get(apiUrl, httpOptions);
    }

    postTest(exam): Observable<any> {
        return this.http.post(apiUrl, exam, {
            headers: new HttpHeaders()
                .set('x-auth-token', this.auth.getToken())
                .set('Content-Type', 'application/json')
        });
    }

    editTest(examId, exam): Observable<any> {
        const apiUrlWithId = apiUrl + '/' + examId;
        return this.http.put(apiUrlWithId, exam, {
            headers: new HttpHeaders()
                .set('x-auth-token', this.auth.getToken())
                .set('Content-Type', 'application/json')
        });
    }

    getDetailTest(examId): Observable<any> {
        const apiUrlWithId = apiUrl + '/' + examId;
        return this.http.get(apiUrlWithId, {
            headers: new HttpHeaders()
                .set('x-auth-token', this.auth.getToken())
                .set('Content-Type', 'application/json')
        });
    }

    deleteTest(examId): Observable<any> {
        const apiUrlWithId = apiUrl + '/' + examId;
        return this.http.delete(apiUrlWithId, {
            headers: new HttpHeaders()
                .set('x-auth-token', this.auth.getToken())
                .set('Content-Type', 'application/json')
        });
    }
}
