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
      required: 'Phone is required',
      notValid: 'This field must be 11 digits'
    },
    address: {
      required: 'Address is required'
    }
  }
  message: string;
  constructor(private activeRoute: ActivatedRoute, 
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.isEditMode = false;
    this.btnTitle = 'Add';
    this.message = '';
    this.title = 'Add Customer';
    this.AddForm = new FormGroup({
      name: new FormControl('' , Validators.required),
      phone: new FormControl('' , [Validators.required , Validators.minLength(11) , 
        Validators.maxLength(11) , Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]),
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
        
        this.customerService.ShowCustomer(id).subscribe(result => {
          this.customerModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Customer';
          this.addCustomerData();
        } , err => console.log(err));
      }
    });
  }

  onSubmit(){
    this.ValidateModel();
    if(!this.isEditMode){
      this.customerService.AddCustomer(this.customerModel).subscribe(x => {
        this.message = 'Customer has Added Successfully'
      }, err => console.log(err));
    }
    else{
      this.customerService.EditCustomer(this.customerModel , this.customerModel.id).subscribe(x => {
        this.message = 'Customer has updated Successfully'
      } , err => console.log(err));
    }
    this.AddForm.reset();
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
