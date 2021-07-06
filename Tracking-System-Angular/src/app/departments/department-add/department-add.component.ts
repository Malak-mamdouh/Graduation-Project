import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/Models/department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
form: FormGroup;
message = '';
title: string;
btnTitle = 'Add';

errorMessage = {
  name: {
    required: 'name is required'
  }
};
department: Department;
  constructor( private fb: FormBuilder, private departmentservice: DepartmentService) { }
  ngOnInit(): void {
    this.title = 'Add Department'
    this.createform();
  }
createform(){
  this.form = this.fb.group({
   name: ['' , Validators.required]
  });
}
onsubmit(){
this.department = Object.assign({} , this.form.value);
console.log(this.department);
// tslint:disable-next-line:no-unused-expression
this.departmentservice.AddDepartment(this.department).subscribe( res => { this.message = 'Department has Added Successfully'; } ,
 // tslint:disable-next-line:no-unused-expression
 (err: any) => {err; } );
}
}
