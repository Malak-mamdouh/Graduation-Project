import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from '../Models/Driver';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DriverService {

    baseUrl = 'https://localhost:44370/drivers/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllDrivers(): Observable<Driver[]>{
        return this.http.get<Driver[]>(this.baseUrl + 'GetAllDrivers');
    }
    GetDriver(id: number){
        return this.http.get(this.baseUrl + 'GetDriver/' + id);
    }
    AddDriver(driver: Driver){
        return this.http.post(this.baseUrl + 'AddDriver' , driver);
    }
    IsDriverNameExists(name: string){
        return this.http.get(this.baseUrl + 'IsDriverExists/' + name);
    }
    IsEmailExists(email: string){
        return this.http.get(this.baseUrl + 'IsEmailExists/' + email);
    }
    EditDriver(driver: Driver){
        return this.http.put(this.baseUrl + 'EditDriver' , driver);
    }
    DeleteDriver(id: number){
        return this.http.get(this.baseUrl + 'DeleteDriver/' + id);
    }
}