import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../Models/Asset';

@Injectable({providedIn: 'root'})
export class AssetService {

    baseUrl = '';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllAssets(){
        return this.http.get(this.baseUrl);
    }
    ShowAsset(id: number): Observable<Asset>{
        return this.http.get<Asset>(this.baseUrl + 'getAsset/' + id);
    }
    AddAsset(asset: Asset){
        return this.http.post(this.baseUrl + 'addAsset' , asset);
    }
    EditAsset(asset: Asset){
        return this.http.put(this.baseUrl + 'editAsset' , asset);
    }
    DeleteAsset(id: number){
        return this.http.get(this.baseUrl + 'deleteAsset/' + id);
    }
}