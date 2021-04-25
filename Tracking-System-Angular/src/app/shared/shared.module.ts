import { NgModule } from "@angular/core";
import { UploadComponent } from '../shared/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [
        UploadComponent
    ]
})

export class SharedModule{

}