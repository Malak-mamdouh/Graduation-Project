import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Driver } from '../../Models/Driver';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.css']
})
export class DriverAddComponent implements OnInit {

  AddForm: FormGroup;
  driverModel: Driver;
  errorMessage = {
    email: {
      required: 'Email is required'
    },
    firstName: {
      required: 'FirstName is required'
    },
    lastName: {
      required: 'LastName is required'
    },
    PhoneNumber: {
      required: 'PhoneNumber is required'
    },
    password: {
      required: 'Password is required'
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.AddForm = new FormGroup({
      email: new FormControl('' , [Validators.email , Validators.required]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      url: new FormControl(''),
      password: new FormControl('', [Validators.required , Validators.minLength(8)]),
      phone: new FormControl('', [Validators.required , Validators.minLength(11) , 
        Validators.maxLength(11)]),
    });
    this.driverModel = {
      id: 0,
      email: '',
      firstName: '',
      lastName: '',
      url: '',
      phoneNumber: '',
      password: '',
    }
  }

  onSubmit(){
    this.ValidateModel();
    console.log(this.AddForm);
    
  }
  ValidateModel(){
    this.driverModel.firstName = this.AddForm.get('firstName').value;
    this.driverModel.lastName = this.AddForm.get('lastName').value;
    this.driverModel.phoneNumber = this.AddForm.get('phone').value;
    this.driverModel.url = this.AddForm.get('url').value;
    this.driverModel.email = this.AddForm.get('email').value;
    this.driverModel.password = this.AddForm.get('password').value;
  }
}
