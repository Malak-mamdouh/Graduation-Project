import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../Models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  loginModel: Login;
  errorMessage = {
    email: {
      required: 'Email is required'
    },
    password: {
      required: 'Password is required'
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('' , [Validators.required, Validators.minLength(8)])
    });
    this.loginModel = {
      email: '',
      password: '',
      rememberMe: false
    }
  }

  onSubmit(){
    this.ValidateModel();
    console.log(this.loginModel);
  }

  ValidateModel(){
    this.loginModel.email = this.LoginForm.get('email').value;
    this.loginModel.password = this.LoginForm.get('password').value;
  }

}
