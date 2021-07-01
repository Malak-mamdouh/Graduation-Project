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
     const token = localStorage.getItem('token');
     if (token){
       this.IsToken = true;
     }
  }
}
