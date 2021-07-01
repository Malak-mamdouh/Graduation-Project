import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
 baseurl =  'https://localhost:44370/api/Tracking/';
constructor(private  http: HttpClient) {
 }
  // tslint:disable-next-line:typedef
  getLocation(id: number){
   return this.http.get(this.baseurl + id);
  }
  // tslint:disable-next-line:typedef
  sendLocation( trip: any){
    return this.http.post(this.baseurl , trip );
   }
}
