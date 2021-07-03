import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../../Models/Customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[];
  isLoading = true;
  constructor(private customerService: CustomerService , 
              private route: Router) { }

  ngOnInit(): void {
    this.customers = [];
    this.customerService.AllCustomers().subscribe(list => {
      this.customers = list;
      this.isLoading = false;
    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you want to delete this customer?');
    if (alert === true){
      this.customerService.DeleteCustomer(id).subscribe(s => {
        this.route.navigate(['customer-list']).then(x => {window.location.reload(); });
        
      } , err => console.log(err));
    }
  }
  onAdd(){
    this.route.navigate(['add-customer']);
  }
  onEdit(id: number){
    this.route.navigate(['edit-customer/', id]);
  }
}
