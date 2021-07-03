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
  IsEmpty: boolean;
  isLoading = true;
  constructor(private driverService: DriverService,
              private route: Router) { }

  ngOnInit(): void {
    this.IsEmpty = true;
    this.driverService.AllDrivers().subscribe(list => {
      this.drivers = list;
      this.isLoading = false;
      if(this.drivers.length >= 1){
        this.IsEmpty = false;
      }
      console.log(this.drivers);
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
    this.route.navigate(['edit-driver/', id]);
  }

  onAdd(){
    this.route.navigate(['add-driver']);
  }
}
