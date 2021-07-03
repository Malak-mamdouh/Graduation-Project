import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { DriverAddComponent } from './drivers/driver-add/driver-add.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';
import { IssueAddComponent } from './issues/issue-add/issue-add.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { IssueListComponent } from './issues/issue-list/issue-list.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TripListComponent } from './Trips/trip-list/trip-list.component';
import { TripAddComponent } from './Trips/trip-add/trip-add.component';
import { TrackingComponent } from './tracking/tracking.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { DepartmentAddComponent } from './departments/department-add/department-add.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
    {path: 'add-driver', component: DriverAddComponent},
    {path: 'edit-driver/:id', component: DriverAddComponent},
    {path: 'add-customer' , component: CustomerAddComponent},
    {path: 'add-department' , component: DepartmentAddComponent},
    {path: 'add-trip' , component: TripAddComponent},
    {path: 'edit-trip/:id' , component: TripAddComponent},
    {path: 'edit-customer/:id' , component: CustomerAddComponent},
    {path: 'customer-list' , component: CustomerListComponent},
    {path: 'add-issue' , component: IssueAddComponent},
    {path: 'edit-issue/:id' , component: IssueAddComponent},
    {path: 'issue-list' , component: IssueListComponent},
    {path: 'trip-list' , component: TripListComponent},
    {path: 'driver-list' , component: DriverListComponent},
    {path: 'department-list' , component: DepartmentListComponent},
    {path: 'filter' , component: LoadingSpinnerComponent},
    {path: 'trip-list/tracking/:id' , component: TrackingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
