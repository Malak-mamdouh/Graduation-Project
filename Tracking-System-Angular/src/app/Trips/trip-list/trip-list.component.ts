import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../Trip';
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
  constructor(private route: Router,
              private tripservice: TripService) { }

  ngOnInit(): void {
    this.IsEmpty = true;

    this.tripservice.AllTrips().subscribe(list => {
      this.Trips = list;
      console.log(this.Trips);
      this.isLoading = false;
      if (this.Trips.length >= 1){
        this.IsEmpty = false;
      }

    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you delete this Issue?');
    if (alert === true){
      this.tripservice.DeleteTrip(id).subscribe(s => {
        this.route.navigate(['trip-list']).then(x => {window.location.reload(); });

      } , err => console.log(err));
    }
  }
  onEdit(id: number){
    this.route.navigate(['edit-trip/', id]);
  }

  onAdd(){
    this.route.navigate(['add-trip']);
  }

}
