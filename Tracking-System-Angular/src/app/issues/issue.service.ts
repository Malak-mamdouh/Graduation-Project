import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../Models/Issue';

@Injectable({providedIn: 'root'})
export class IssueService {

    baseUrl = 'https://localhost:44370/issues/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllIssues(): Observable<Issue[]>{
        return this.http.get<Issue[]>(this.baseUrl + 'GetIssues');
    }
    ShowIssue(id: number): Observable<Issue>{
        return this.http.get<Issue>(this.baseUrl + 'getAsset/' + id);
    }
    AddIssue(issue: Issue){
        return this.http.post(this.baseUrl + 'AddIssue' , issue);
    }
    EditIssue(issue: Issue){
        return this.http.put(this.baseUrl + 'updateIssue' , issue);
    }   
    DeleteIssue(id: number){
        return this.http.delete(this.baseUrl + 'Delete/' + id);
    }
}