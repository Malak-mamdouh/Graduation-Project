import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  
    $(document).ready( function() {
      // tslint:disable-next-line: only-arrow-functions
      $('#sidebarCollapse').on('click', function() {
          $('#sidebar').toggleClass('active');
      });
  });
  }
  
}
