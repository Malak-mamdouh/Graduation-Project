import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../Models/Login';

@Injectable({providedIn: 'root'})
export class AccountService {

    baseUrl = 'https://localhost:44370/account/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    login(loginModel :Login): Observable<any>{
        return this.http.post(this.baseUrl + 'login' , loginModel);
    }
}