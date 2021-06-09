import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../Models/Login';
import { AccountService } from './account.service';

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
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('' , [Validators.required, Validators.minLength(7)])
    });
    this.loginModel = {
      email: '',
      password: '',
      rememberMe: false
    }
  }

  onSubmit(){
    this.ValidateModel();
    this.accountService.login(this.loginModel).subscribe(response => {
      console.log(response);
      localStorage.setItem('token' , response.token);
    } , err => console.log(err));
    this.LoginForm.reset();
  }

  ValidateModel(){
    this.loginModel.email = this.LoginForm.get('email').value;
    this.loginModel.password = this.LoginForm.get('password').value;
  }

}
