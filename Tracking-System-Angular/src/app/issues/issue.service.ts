import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../Models/Issue';

@Injectable({providedIn: 'root'})
export class IssueService {

    baseUrl = '';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllIssues(){
        return this.http.get(this.baseUrl);
    }
    ShowIssue(id: number): Observable<Issue>{
        return this.http.get<Issue>(this.baseUrl + 'getAsset/' + id);
    }
    AddIssue(issue: Issue){
        return this.http.post(this.baseUrl + 'addAsset' , issue);
    }
    EditIssue(issue: Issue){
        return this.http.put(this.baseUrl + 'editAsset' , issue);
    }   
}