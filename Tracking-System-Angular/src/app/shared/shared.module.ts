import { NgModule } from "@angular/core";
import { UploadComponent } from '../shared/upload/upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TypeFilterPipe } from './type-filter.pipe';

@NgModule({
    declarations: [
        UploadComponent,
        LoadingSpinnerComponent,
        TypeFilterPipe
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
    ],
    exports: [
        UploadComponent,
        LoadingSpinnerComponent
    ]
})

export class SharedModule{

}