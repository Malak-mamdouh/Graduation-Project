import { Component, OnInit } from '@angular/core';
import { Driver } from '../../Models/Driver';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  drivers: Driver[];
  constructor(private driverService: DriverService,
              private route: Router) { }

  ngOnInit(): void {
    this.driverService.AllDrivers().subscribe(list => {
      this.drivers = list;
    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Product?');
    if (alert === true){
      this.driverService.DeleteDriver(id).subscribe(s => {
        this.route.navigate(['asset-list']).then(x => {window.location.reload(); });
        
      } , err => console.log(err));
    }
  }
  public createImgPath(serverpath: string){
    return `https://localhost:44370/${serverpath}`;
  }
  onEdit(id: number){
    this.route.navigate(['edit-asset/', id]);
  }

}
