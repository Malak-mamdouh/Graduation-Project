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
  constructor(private customerService: CustomerService , 
              private route: Router) { }

  ngOnInit(): void {
    this.customerService.AllCustomers().subscribe(list => {
      this.customers = list;
    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Asset?');
    if (alert === true){
      this.customerService.DeleteCustomer(id).subscribe(s => {
        this.route.navigate(['customer-list']).then(x => {window.location.reload(); });
        
      } , err => console.log(err));
    }
  }
  
  onEdit(id: number){
    this.route.navigate(['edit-customer/', id]);
  }
}
