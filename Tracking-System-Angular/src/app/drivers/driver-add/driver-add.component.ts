import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Driver } from '../../Models/Driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-add',
  templateUrl: './driver-add.component.html',
  styleUrls: ['./driver-add.component.css']
})
export class DriverAddComponent implements OnInit {

  AddForm: FormGroup;
  response: {url: ''};
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
  message: string;
  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.AddForm = new FormGroup({
      email: new FormControl('' , [Validators.email , Validators.required]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      url: new FormControl(''),
      password: new FormControl('', [Validators.required , Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required , Validators.minLength(11) , 
        Validators.maxLength(11)]),
    });
    this.message = '';
    this.driverModel = {
      email: '',
      firstName: '',
      lastName: '',
      url: '',
      phone: '',
      password: '',
    },
    this.response = {
      url: ''
    }
  }

  onSubmit(){
    this.ValidateModel();
    this.driverModel.url = this.response.url;
    this.driverService.AddDriver(this.driverModel).subscribe(result => {
      this.message = 'Driver has added successfully'
    } , err => console.log(err));
    this.AddForm.reset();
  }
  public uploadFinished = (event) =>{
    this.response = event;
  }
  ValidateModel(){
    this.driverModel.firstName = this.AddForm.get('firstName').value;
    this.driverModel.lastName = this.AddForm.get('lastName').value;
    this.driverModel.phone = this.AddForm.get('phone').value;
    this.driverModel.url = this.AddForm.get('url').value;
    this.driverModel.email = this.AddForm.get('email').value;
    this.driverModel.password = this.AddForm.get('password').value;
  }
}
