import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  IsToken = false;
  ngOnInit(): void {
     const token = localStorage.getItem('token');
     if (token){
       this.IsToken = true;
     }
  }
}
