import { NgModule } from '@angular/core';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        DriverAddComponent,
        DriverListComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    exports:[
        DriverAddComponent,
        DriverListComponent
    ]
})

export class DriversModule{

}