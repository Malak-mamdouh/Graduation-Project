import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from '../../Models/Customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  AddForm: FormGroup;
  customerModel: Customer;
  isEditMode: boolean;
  btnTitle: string;
  title: string;
  errorMessage = {
    name: {
      required: 'name is required'
    },
    phone: {
      required: 'Phone is required'
    },
    address: {
      required: 'Address is required'
    }
  }
  constructor(private activeRoute: ActivatedRoute, 
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.isEditMode = false;
    this.btnTitle = 'Add';
    this.title = 'Add Customer';
    this.AddForm = new FormGroup({
      name: new FormControl('' , Validators.required),
      phone: new FormControl('' , Validators.required),
      address: new FormControl('' , Validators.required)
    });
    this.customerModel = {
      id:0,
      name:'',
      phone:'',
      address:''
    };
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
        this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
        this.customerService.ShowCustomer(id).subscribe(result => {
          this.customerModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
          this.addCustomerData();
        } , err => console.log(err));
      }
    });
  }

  onSubmit(){
  }
  addCustomerData(){
    if(this.customerModel !== null){
      this.AddForm.setValue({
        name: this.customerModel.name,
        phone: this.customerModel.phone,
        address: this.customerModel.address
      });
    }
  }
  ValidateModel(){
    this.customerModel.name = this.AddForm.get('name').value;
    this.customerModel.phone = this.AddForm.get('phone').value;
    this.customerModel.address = this.AddForm.get('address').value;
  }
}
