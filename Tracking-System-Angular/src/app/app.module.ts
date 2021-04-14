import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DriversModule } from './drivers/drivers.module';
import { AssetsModule } from './assets/assets.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { IssueAddComponent } from './issues/issue-add/issue-add.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CustomerAddComponent,
    IssueAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DriversModule,
    AssetsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }