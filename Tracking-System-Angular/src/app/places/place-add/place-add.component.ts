import { Component, OnInit } from '@angular/core';
import { Place } from '../../Models/Place';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlaceService } from '../place.service';
import { DriverService } from '../../drivers/driver.service';
import { Driver } from '../../Models/Driver';

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.css']
})
export class PlaceAddComponent implements OnInit {

  AddForm: FormGroup;
  placeModel: Place;
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

  constructor(private activeRoute: ActivatedRoute , 
              private placeService: PlaceService , 
              private driverService: DriverService) { }

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
      const id = +param.get('id');
      if(id){ 
        this.placeService.ShowPlace(id).subscribe(result => {
          this.placeModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Place';
          this.addCustomerData();
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
