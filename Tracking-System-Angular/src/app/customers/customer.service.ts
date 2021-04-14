import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Models/Customer';

@Injectable({providedIn: 'root'})
export class CustomerService {

    baseUrl = '';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllCustomers(){
        return this.http.get(this.baseUrl);
    }
    ShowCustomer(id: number): Observable<Customer>{
        return this.http.get<Customer>(this.baseUrl + 'getAsset/' + id);
    }
    AddCustomer(customer: Customer){
        return this.http.post(this.baseUrl + 'addAsset' , customer);
    }
    EditCustomer(customer: Customer){
        return this.http.put(this.baseUrl + 'editAsset' , customer);
    }   
}