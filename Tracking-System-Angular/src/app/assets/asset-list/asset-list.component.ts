import { Component, OnInit } from '@angular/core';
import { AssetService } from '../asset.service';
import { Asset } from '../../Models/Asset';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {

  assets: Asset[] = [];
  isLoading = true;
  constructor(private assetService: AssetService , 
              private route: Router) { }

  ngOnInit(): void {
    
    this.assetService.AllAssets().subscribe((list: any) => {
      this.assets = list.data;
      this.isLoading = false;
      console.log(this.assets);
    }, err => console.log(err));
    
  }

  public createImgPath(serverpath: string){
    return `https://localhost:44370/${serverpath}`;
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Asset?');
    if (alert === true){
      this.assetService.DeleteAsset(id).subscribe(s => {
        this.route.navigate(['asset-list']).then(x => {window.location.reload(); });  
      } , err => console.log(err));
    }
  }
  onEdit(id: number){
    this.route.navigate(['edit-asset/', id]);
  }
  onAdd(){
    this.route.navigate(['add-asset']);
  }
}
