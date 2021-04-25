import { NgModule } from '@angular/core';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetListComponent } from './asset-list/asset-list.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetsRoutingModule } from './assets-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AssetAddComponent,
        AssetListComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        AssetsRoutingModule,
        SharedModule
    ],
    exports: [
        AssetAddComponent,
        AssetListComponent
    ]
})
export class AssetsModule {

}