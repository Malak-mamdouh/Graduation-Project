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


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
    {path: 'add-driver', component: DriverAddComponent},
    {path: 'add-customer' , component: CustomerAddComponent},
    {path: 'edit-customer/:id' , component: CustomerAddComponent},
    {path: 'customer-list' , component: CustomerListComponent},
    {path: 'add-issue' , component: IssueAddComponent},
    {path: 'issue-list' , component: IssueListComponent},
    {path: 'driver-list' , component: DriverListComponent},
    {path: 'filter' , component: LoadingSpinnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
