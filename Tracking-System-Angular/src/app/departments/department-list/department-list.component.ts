import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/Models/department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[];
  isLoading = true;
  constructor(private departmentservice: DepartmentService ,
              private route: Router
              ) { }

  ngOnInit(): void {
    this.departments = [];
    this.departmentservice.Alldepartments().subscribe(list => {
      this.departments = list;
      this.isLoading = false;
    } , err => console.log(err));
  }
  onDelete(id: number){
    const alert = confirm('Do you want to delete this customer?');
    if (alert === true){
      this.departmentservice.DeleteDepartment(id).subscribe(s => {
        this.route.navigate(['department-list']).then(x => {window.location.reload(); });
      } , err => console.log(err));
    }
  }
  onAdd(){
    this.route.navigate(['add-department']);
  }
  onEdit(id: number){
    this.route.navigate(['edit-department/', id]);
  }
}
