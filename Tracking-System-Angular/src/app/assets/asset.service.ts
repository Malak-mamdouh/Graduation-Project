import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../Models/Asset';

@Injectable({providedIn: 'root'})
export class AssetService {

    baseUrl = 'https://localhost:44370/assets/';
    headers = {
        headers: new HttpHeaders({
            'content-type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {}

    AllAssets(): Observable<Asset[]>{
        return this.http.get<Asset[]>(this.baseUrl + 'GetAllAssets');
    }
    GetAllPrivateAssets(): Observable<Asset[]>{
        return this.http.get<Asset[]>(this.baseUrl + 'GetAllPrivateAssets');
    }
    SelectAllNumbers(): Observable<string[]>{
        return this.http.get<string[]>(this.baseUrl + 'SelectAllAssetNumber')
    }
    ShowAsset(id: number): Observable<Asset>{
        return this.http.get<Asset>(this.baseUrl + 'GetAsset/' + id);
    }
    AddAsset(asset: Asset){
        return this.http.post(this.baseUrl + 'PostAsset' , asset);
    }
    EditAsset(asset: Asset){
        return this.http.put(this.baseUrl + 'EditAsset' , asset);
    }
    DeleteAsset(id: number){
        return this.http.delete(this.baseUrl + 'DeleteAsset/' + id);
    }
    IsNameExists(name: string){
        return this.http.get(this.baseUrl + 'IsNameExists/' + name);
    }
    IsNumberExists(assetNumber: string){
        return this.http.get(this.baseUrl + 'IsNumberExists/' + assetNumber);
    }
}