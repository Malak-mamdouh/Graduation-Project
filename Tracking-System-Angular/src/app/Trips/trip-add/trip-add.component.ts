import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/customers/customer.service';
import { DepartmentService } from 'src/app/departments/department.service';
import { Customer } from 'src/app/Models/Customer';
import { Department } from 'src/app/Models/department';
import { Estatus } from 'src/app/Models/Issue';
import { Trip, Tripstatus } from '../../Models/Trip';
import { TripService } from '../Trip.service';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {

  AddForm: FormGroup;
  tripModel: Trip;
  isEditMode: boolean;
  btnTitle: string;
  title: string;
  keys = [];
  customers: Customer[] = [];
  departments: Department[] = [];
  message: string;
  /*statusList = [{id:1 , name:'Open'} , {id:2 , name:'Resolved'} , {id:3 , name:'Closed'}];*/
  statuslist = Tripstatus;
  errorMessage = {
    date: {
      required: 'date is required',
      format: ''
    },
    destination: {
      required: 'Destination is required'
    },
    status: {
      required: 'Status is required'
    },
    departmentId: {
      required: 'department is required'
    },
    customerName: {
      required: 'Customer Name is required'
    }, customerPhone: {
      required: 'customer Phone is required'
    }, customerAdress: {
      required: 'customer Adress Adress is required'
    }, customerRegion: {
      required: 'customer Region is required'
    },
  };
  constructor(private activeRoute: ActivatedRoute,
              private tripservice: TripService,
              private customerservice: CustomerService,
              private departmentservice: DepartmentService
              ) {
              }

  ngOnInit(): void {
    this.customerservice.AllCustomers().subscribe((list: Customer[]) => {
      this.customers = list;
      console.log(this.customers);
    } , err => console.log(err));
    this.departmentservice.Alldepartments().subscribe((list: Department[]) => {
      this.departments = list;
      console.log(this.departments);
    } , err => console.log(err));
    this.isEditMode = false;
    this.title = 'Add Trip';
    this.btnTitle = 'Add';
    this.message = '';
    this.AddForm = new FormGroup({
      date: new FormControl('' , Validators.required),
      destination: new FormControl('' , Validators.required),
      status: new FormControl('Waiting' , Validators.required),
      departmentId: new FormControl('' , Validators.required),
      customerName: new FormControl('' , Validators.required),
      customerRegion: new FormControl('' , Validators.required),
      customerPhone: new FormControl('' , Validators.required),
    });
    this.tripModel = {
      id: 0,
      date: new Date(),
      status: '',
      destination: '',
      departmentId: 0,
      customerPhone: '',
      customerName: '',
      customerRegion: '',
    };
    this.keys = Object.keys(this.statuslist);
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if (id){
          this.btnTitle = 'Edit';
          this.title = 'Edit Trip';
          this.tripservice.ShowTrip(id).subscribe(result => {
          this.tripModel = result;
          this.isEditMode = true;
          console.log(this.tripModel.date);
          this.title = 'Edit Trip';
        //  this.addIssueData();
        } , err => console.log(err));
      }
    });
  }
  onSubmit(){
    this.ValidateModel();
    console.log(this.tripModel);

    this.tripservice.AddTrip(this.tripModel).subscribe(x => {
      this.message = 'Trip is Added Successfully';
    } , err => console.log(err));
    this.AddForm.reset();
    this.AddForm.patchValue({
      customerId: '',
      status: 'Waiting'
    });
  }
  /*
  addIssueData(){
    if (this.issueModel !== null){
      this.AddForm.setValue({
        date: this.issueModel.date,
        status: this.issueModel.status,
        description: this.issueModel.description,
        reportedBy: this.issueModel.reportedBy,
        assetId: this.issueModel.assetId
      });
    }
  }
  */

  ValidateModel(){
    /*this.issueModel.asset_number = this.AddForm.get('asset_number').value;*/
    this.tripModel.date = this.AddForm.get('date').value;
    this.tripModel.destination = this.AddForm.get('destination').value;
    this.tripModel.status = this.AddForm.get('status').value;
    this.tripModel.customerName = this.AddForm.get('customerName').value;
    this.tripModel.customerRegion = this.AddForm.get('customerRegion').value;
    this.tripModel.customerPhone = this.AddForm.get('customerPhone').value;
    this.tripModel.departmentId = this.AddForm.get('departmentId').value;

  }

  checkDate(){
    const date = this.AddForm.get('date').value;
    const todayDate = new Date();
    if (date){
      if (new Date(date) < todayDate){
        this.errorMessage.date.format = 'This Date in the past';
        return true;
      }
    }
    return false;
  }

}
