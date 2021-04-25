import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetListComponent } from './asset-list/asset-list.component';


const routes: Routes = [
    {path: 'add-asset', component: AssetAddComponent},
    {path: 'edit-asset/:id' , component: AssetAddComponent},
    {path: 'asset-list' , component: AssetListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
