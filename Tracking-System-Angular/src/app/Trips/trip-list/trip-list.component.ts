import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip, Tripstatus } from '../../Models/Trip';
import { TripService } from '../Trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  Trips: Trip[] = [];
  IsEmpty: boolean;
  isLoading = true;
  statuslist = Tripstatus;
  SelectedKey = "A";
  keys = [];
  secondTips: Trip[] = [];
  IsTracking = false;
  constructor(private route: Router,
              private tripservice: TripService) { }

  ngOnInit(): void {
    this.IsEmpty = true;
    this.keys = Object.keys(this.statuslist);
    this.GetAllTrips();
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Issue?');
    if (alert === true){
      this.tripservice.DeleteTrip(id).subscribe(s => {
        this.route.navigate(['trip-list']).then(x => {window.location.reload(); });

      } , err => console.log(err));
    }
  }
  filterDate(key: string){
    const date = new Date();
    this.SelectedKey = key;
    const filteredTrips = []; 
    this.secondTips.forEach(trip => {
      const tripDate = new Date(trip.date);
      if(tripDate.getDate() === date.getDate()){        
        filteredTrips.push(trip);
        if(tripDate.getHours() === date.getHours()){
          this.IsTracking = true;
        }
      } 
      
    });
    this.Trips = filteredTrips;
  }
  onEdit(id: number){
    this.route.navigate(['edit-trip/', id]);
  }

  onAdd(){
    this.route.navigate(['add-trip']);
  }
  GetAllTrips(){
    this.tripservice.AllTrips().subscribe(list => {
      this.Trips = list;
      this.IsTracking = false;
      this.secondTips = list;
      console.log(this.Trips);
      this.isLoading = false;
      if (this.Trips.length >= 1){
        this.IsEmpty = false;
      }

    } , err => console.log(err));
  }
  filter(key: string){
    if(key != 'A'){
      this.IsTracking = false;
      this.tripservice.FilteredTrips(this.statuslist[key]).subscribe(list => {
        this.Trips = list;
        this.SelectedKey = key;
        console.log(this.Trips);
        this.isLoading = false;
        if (this.Trips.length >= 1){
          this.IsEmpty = false;
        }
      } , err => console.log(err));
    }
    else{
      this.GetAllTrips();
      this.SelectedKey = key;
    }
  }
}
