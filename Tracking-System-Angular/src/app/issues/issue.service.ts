import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../Models/Issue';
import { IssueList } from '../Models/issue-list';

@Injectable({providedIn: 'root'})
export class IssueService {

    baseUrl = 'https://localhost:44370/issues/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllIssues(): Observable<IssueList[]>{
        return this.http.get<IssueList[]>(this.baseUrl + 'GetIssues');
    }
    ShowIssue(id: number): Observable<Issue>{
        return this.http.get<Issue>(this.baseUrl + 'GetIssue/' + id);
    }
    AddIssue(issue: Issue){
        return this.http.post(this.baseUrl + 'AddIssue' , issue);
    }
    EditIssue(id: number, issue: Issue){
        return this.http.put(this.baseUrl + 'updateIssue/' + id , issue);
    }   
    DeleteIssue(id: number){
        return this.http.delete(this.baseUrl + 'Delete/' + id);
    }
}