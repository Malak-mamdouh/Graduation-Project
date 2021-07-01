import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // tslint:disable-next-line:no-inferrable-types
  IsToken: boolean = false;
  title = 'Tracking-System-Angular';
  ngOnInit(): void {
     // tslint:disable-next-line:prefer-const
     let token = localStorage.getItem('token');
     if (token){
       this.IsToken = true;
     }
  }
}
