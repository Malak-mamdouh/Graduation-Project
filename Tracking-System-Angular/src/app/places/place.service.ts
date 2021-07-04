import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../Models/Place';

@Injectable({providedIn: 'root'})
export class PlaceService {

    baseUrl = 'https://localhost:44370/places/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllPlaces(): Observable<Place[]>{
        return this.http.get<Place[]>(this.baseUrl + 'GetAllPlaces');
    }
    ShowPlace(id: number): Observable<Place>{
        return this.http.get<Place>(this.baseUrl + 'GetPlace/' + id);
    }
    AddPlace(place: Place){
        return this.http.post(this.baseUrl + 'PostPlace' , place);
    }
    EditPlace(place: Place , id: number){
        return this.http.put(this.baseUrl + 'EditPlace/' + id , place);
    } 
    DeletePlace(id: number){
        return this.http.delete(this.baseUrl + 'DeletePlace/' + id);
    }  
}