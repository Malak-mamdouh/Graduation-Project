import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './Trip';

@Injectable({providedIn: 'root'})
export class TripService {

    baseUrl = 'https://localhost:44370/Trips/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllTrips(): Observable<Trip[]>{
        return this.http.get<Trip[]>(this.baseUrl + 'GetTrips');
    }
    ShowTrip(id: number): Observable<Trip>{
        return this.http.get<Trip>(this.baseUrl + 'GetTrip/' + id);
    }
    AddTrip(trip: Trip){
        return this.http.post(this.baseUrl + 'PostTrip' , trip);
    }
    EditTrip(trip: Trip){
        return this.http.put(this.baseUrl + 'PutTrip' , trip);
    }
    DeleteTrip(id: number){
        return this.http.delete(this.baseUrl + 'DeleteTrip/' + id);
    }
}
