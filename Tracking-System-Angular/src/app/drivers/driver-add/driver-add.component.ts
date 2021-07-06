import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Driver } from '../../Models/Driver';
import { DriverService } from '../driver.service';
import { ActivatedRoute } from '@angular/router';

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
      required: 'Email is required',
      notValid:'Email is not valid',
      emailExist: ''
    },
    firstName: {
      required: 'FirstName is required',
      nameExist: ''
    },
    lastName: {
      required: 'LastName is required'
    },
    PhoneNumber: {
      required: 'PhoneNumber is required',
      notValid: 'This field must be 11 digits'
    },
    password: {
      required: 'Password is required',
      notValid: ''
    }
  }
  message: string;
  NameExist: boolean;
  regex: RegExp;
  EmailExist: boolean;
  isEditMode = false;
  btnTitle = '';
  title = '';
  constructor(private driverService: DriverService , 
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = 'Add Driver';
    this.btnTitle = 'Add';
    this.AddForm = new FormGroup({
      email: new FormControl('' , [Validators.email , Validators.required , 
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required , Validators.minLength(6)]),
      phone: new FormControl('', [Validators.required , Validators.minLength(11) , 
        Validators.maxLength(11) , Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]),
    });
    this.message = '';
    this.driverModel = {
      driverId:0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
    },
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
        
        this.driverService.GetDriver(id).subscribe(result => {
          this.driverModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Driver';
          this.addDriverData();
        } , err => console.log(err));
      }
    });
    this.NameExist = false;
    this.EmailExist = false;
  }

  onSubmit(){
    this.ValidateModel();
    /*this.driverModel.url = this.response.url;*/
    
    if(!this.isEditMode){
      this.driverService.AddDriver(this.driverModel).subscribe(result => {
        this.message = 'Driver has added successfully'
      } , err => console.log(err));
    }
    else{
      this.driverService.EditDriver(this.driverModel.driverId , this.driverModel).subscribe(x => {
        this.message = 'Driver has updated Successfully'
      } , err => console.log(err));
    }
    this.AddForm.reset();
    this.AddForm.value.password = '';
  }

  isDriverNameExist(){
    const name = this.AddForm.value.firstName;
    if (name != null && name !== '' && this.driverModel.firstName != name){
      this.driverService.IsDriverNameExists(name).subscribe(suc => {
        this.errorMessage.firstName.nameExist = 'This name is used';
        this.NameExist = true;
      }, err => {
        this.errorMessage.firstName.nameExist = '';
        this.NameExist = false;
        });
      return true;
    }
    return false;
  }

  isEmailExist(){
    const email = this.AddForm.value.email;
    if (email != null && email !== '' && this.driverModel.email != email){
      this.driverService.IsEmailExists(email).subscribe(suc => {
        this.errorMessage.email.emailExist = 'This Email is used';
        this.EmailExist = true;
      }, err => {
        this.errorMessage.email.emailExist = '';
        this.EmailExist = false;
        });
      return true;
    }
    return false;
  }

  addDriverData(){
    if(this.driverModel !== null){
      this.AddForm.setValue({
        email: this.driverModel.email,
        firstName : this.driverModel.firstName,
        lastName: this.driverModel.lastName,
        phone: this.driverModel.phone,
        password: this.driverModel.password
      });
    }
  }

  public uploadFinished = (event) =>{
    this.response = event;
  }

  isPasswordValid(){
    const pass = this.AddForm.value.password;
    if (pass !== '' && pass.length > 6){
      this.regex = new RegExp('[a-z]');
      if (!this.regex.test(pass)){
        this.errorMessage.password.notValid = 'password should contain at least a small character';
        return false;
      }
      this.regex = new RegExp('[0-9]');
      if (!this.regex.test(pass)){
        this.errorMessage.password.notValid = 'password should contain at least one digit';
        return false;
      }
    }
    return true;
  }

  ValidateModel(){
    this.driverModel.firstName = this.AddForm.get('firstName').value;
    this.driverModel.lastName = this.AddForm.get('lastName').value;
    this.driverModel.phone = this.AddForm.get('phone').value;
    this.driverModel.email = this.AddForm.get('email').value;
    this.driverModel.password = this.AddForm.get('password').value;
  }
}
