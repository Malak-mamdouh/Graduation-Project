import { Component, OnInit } from '@angular/core';
import { Place } from '../../Models/Place';
import { PlaceService } from '../place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  places: Place[] = [];
  IsEmpty: boolean;
  isLoading = true;
  constructor(private placeService: PlaceService , 
              private route: Router) { }

  ngOnInit(): void {
    this.IsEmpty = true;
    this.placeService.AllPlaces().subscribe(list => {
      this.places = list;
      console.log(this.places);
      this.isLoading = false;
      if(this.places.length >= 1){
        this.IsEmpty = false;
      }    
    } , err => console.log(err));
  }

  onDelete(id: number){
    const alert = confirm('Do you delete this Issue?');
    if (alert === true){
      this.placeService.DeletePlace(id).subscribe(s => {
        this.route.navigate(['place-list']).then(x => {window.location.reload(); });
      } , err => console.log(err));
    }
  }

  onEdit(id: number){
    console.log(id);
    this.route.navigate(['edit-place/', id]);
  }

  onAdd(){
    this.route.navigate(['add-place']);
  }

}
