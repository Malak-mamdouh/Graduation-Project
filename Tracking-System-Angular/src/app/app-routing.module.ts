import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { LoginComponent } from './Auth/login/login.component';
import { DriverAddComponent } from './drivers/driver-add/driver-add.component';
import { CustomerAddComponent } from './customers/customer-add/customer-add.component';


const routes: Routes = [
  {path: '' , component: LoginComponent},
    {path: 'add-driver', component: DriverAddComponent},
    {path: 'add-customer' , component: CustomerAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
