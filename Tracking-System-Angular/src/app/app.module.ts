import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DriversModule } from './drivers/drivers.module';
import { AssetsModule } from './assets/assets.module';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { IssueAddComponent } from './issues/issue-add/issue-add.component';
import { SharedModule } from './shared/shared.module';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { TripsComponent } from './trips/trips.component';
import { PlacesComponent } from './places/places.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CustomerAddComponent,
    IssueAddComponent,
    CustomerListComponent,
    IssueListComponent,
    TripsComponent,
    PlacesComponent
  ],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['https://localhost:44370/'],
        disallowedRoutes: [''],
      },
    }),
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
