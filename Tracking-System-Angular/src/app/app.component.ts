import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  IsToken:boolean = false;
  ngOnInit(): void {
     var token = localStorage.getItem('token');
     if(token){
       this.IsToken = true;
     }
  }
  title = 'Tracking-System-Angular';
}
