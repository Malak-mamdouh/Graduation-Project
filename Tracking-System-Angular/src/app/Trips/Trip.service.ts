import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../Models/Trip';
import { TripList } from '../Models/TripList';

@Injectable({providedIn: 'root'})
export class TripService {

    baseUrl = 'https://localhost:44370/Trips/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllTrips(): Observable<TripList[]>{
        return this.http.get<TripList[]>(this.baseUrl + 'GetTrips');
    }
    FilteredTrips(status: string): Observable<TripList[]>{
        return this.http.get<TripList[]>(this.baseUrl + 'GetTrips/' + status);
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
