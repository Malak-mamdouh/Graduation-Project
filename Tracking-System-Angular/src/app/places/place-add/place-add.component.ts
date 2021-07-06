import { Component, OnInit } from '@angular/core';
import { Place } from '../../Models/Place';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceService } from '../place.service';
import { DriverService } from '../../drivers/driver.service';
import { Driver } from '../../Models/Driver';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

  AddForm: FormGroup;
  placeModel: Place;
  objects: {userName: string , id: number}[] = [];
  isEditMode: boolean;
  btnTitle: string;
  title: string;
  drivers: Driver[] = [];
  errorMessage = {
    region: {
      required: 'Region is required'
    }
  }
  message: string;
  id: number;
  constructor(private activeRoute: ActivatedRoute , 
              private placeService: PlaceService , 
              private driverService: DriverService , 
              private route: Router) { }

  ngOnInit(): void {
    this.isEditMode = false;
    this.btnTitle = 'Add';
    this.message = '';
    this.title = 'Add Place';
    this.AddForm = new FormGroup({
      region: new FormControl('' , Validators.required),
      uId: new FormControl('' , Validators.required)
    });
    this.placeModel = {
      id:0,
      region: '',
      uId: 0
    };
    this.activeRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      if(this.id){ 
        this.placeService.ShowPlace(this.id).subscribe(result => {
          this.placeModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Place';
          this.addCustomerData();
        } , err => console.log(err));
        this.placeService.filterDrivers(this.id).subscribe(list => {
          this.objects = list;
        } , err => console.log(err));
      }
    });
    this.driverService.AllDrivers().subscribe(list => {
      this.drivers = list;
    } , err => console.log(err));
  }

  onSubmit(){
    this.ValidateModel();
    console.log(this.placeModel.region);
    if(!this.isEditMode){
      this.placeService.AddPlace(this.placeModel).subscribe(x => {
        this.message = 'Place has Added Successfully'
      }, err => console.log(err));
    }
    else{
      this.placeService.EditPlace(this.placeModel , this.placeModel.id).subscribe(x => {
        this.message = 'Place has updated Successfully'
      } , err => console.log(err));
    }
    this.AddForm.reset();
    this.AddForm.patchValue({
      uId: ''
    });
  }

  onDelete(id: number){
    const alert = confirm('Do you want to delete this Driver?');
    if (alert === true){
      this.placeService.DeleteDriver(this.id , id).subscribe(s => {
        this.route.navigate(['edit-place/' + this.id]).then(x => {window.location.reload(); });
      } , err => console.log(err));
    }
  }

  addCustomerData(){
    if(this.placeModel !== null){
      this.AddForm.patchValue({
        region: this.placeModel.region
      });
    }
  }

  ValidateModel(){
    this.placeModel.region = this.AddForm.get('region').value;
    this.placeModel.uId = this.AddForm.get('uId').value;
  }
}
