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
import { SharedModule } from './shared/shared.module';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { PlacesComponent } from './places/places.component';
import { TripListComponent } from './Trips/trip-list/trip-list.component';
import { TripAddComponent } from './Trips/trip-add/trip-add.component';
import { TrackingComponent } from './tracking/tracking.component';
import { PlaceAddComponent } from './places/place-add/place-add.component';
import { PlaceListComponent } from './places/place-list/place-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CustomerAddComponent,
    IssueAddComponent,
    CustomerListComponent,
    IssueListComponent,
    PlacesComponent,
    TripListComponent,
    TripAddComponent,
    TrackingComponent,
    PlaceAddComponent,
    PlaceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DriversModule,
    AssetsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
