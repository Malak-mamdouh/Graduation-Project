import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  baseUrl = 'https://localhost:44370/department/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    Alldepartments(): Observable<Department[]>{
        return this.http.get<Department[]>(this.baseUrl + 'GetAlldepartments');
    }
    ShowDepatrment(id: number): Observable<Department>{
        return this.http.get<Department>(this.baseUrl + 'Getdepartment/' + id);
    }
    AddDepartment(department: Department){
        return this.http.post(this.baseUrl + 'AddDepartment' , department);
    }
    EditDepartment(department: Department , id: number){
        return this.http.put(this.baseUrl + 'EditDepartment/' + id , department);
    }
    DeleteDepartment(id: number){
        return this.http.delete(this.baseUrl + 'Deletedepartment/' + id);
    }
}

