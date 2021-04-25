import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Models/Customer';

@Injectable({providedIn: 'root'})
export class CustomerService {

    baseUrl = 'https://localhost:44370/customers/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllCustomers(): Observable<Customer[]>{
        return this.http.get<Customer[]>(this.baseUrl + 'GetAllCustomers');
    }
    ShowCustomer(id: number): Observable<Customer>{
        return this.http.get<Customer>(this.baseUrl + 'GetCustomer/' + id);
    }
    AddCustomer(customer: Customer){
        return this.http.post(this.baseUrl + 'AddCustomer' , customer);
    }
    EditCustomer(customer: Customer , id: number){
        return this.http.put(this.baseUrl + 'EditCustomer/' + id , customer);
    } 
    DeleteCustomer(id: number){
        return this.http.delete(this.baseUrl + 'DeleteCustomer/' + id);
    }  
}