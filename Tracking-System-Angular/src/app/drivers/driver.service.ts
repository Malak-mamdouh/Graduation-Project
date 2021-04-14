import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../Models/Driver';

@Injectable({providedIn: 'root'})
export class DriverService {

    baseUrl = '';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllDrivers(){
        return this.http.get(this.baseUrl);
    }
    GetDriver(id: number){
        return this.http.get(this.baseUrl + 'getAsset/' + id);
    }
    AddDriver(driver: Driver){
        return this.http.post(this.baseUrl + 'addAsset' , driver);
    }
    EditDriver(driver: Driver){
        return this.http.put(this.baseUrl + 'editAsset' , driver);
    }
    DeleteDriver(id: number){
        return this.http.get(this.baseUrl + 'deleteAsset/' + id);
    }
}