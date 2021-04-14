import { NgModule } from '@angular/core';
import { DriverAddComponent } from './driver-add/driver-add.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DriverAddComponent,
        DriverListComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    exports:[
        DriverAddComponent,
        DriverListComponent
    ]
})

export class DriversModule{

}