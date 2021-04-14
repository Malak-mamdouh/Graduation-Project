import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Issue } from '../../Models/Issue';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-issue-add',
  templateUrl: './issue-add.component.html',
  styleUrls: ['./issue-add.component.css']
})
export class IssueAddComponent implements OnInit {

  AddForm: FormGroup;
  issueModel: Issue;
  isEditMode: boolean;
  btnTitle: string;
  title: string;
  errorMessage = {
    asset_number: {
      required: 'Number is required'
    },
    date: {
      required: 'Date is required'
    },
    status: {
      required: 'Status is required'
    },
    description: {
      required: 'Description is required'
    },
    reportedBy: {
      required: 'This Field is required'
    }
  }
  constructor(private activeRoute: ActivatedRoute, 
              private issueService: IssueService) { }

  ngOnInit(): void {
    this.isEditMode = false;
    this.btnTitle = 'Add';
    this.title = 'Add Issue';
    this.AddForm = new FormGroup({
      asset_number: new FormControl('' , Validators.required),
      phone: new FormControl('' , Validators.required),
      address: new FormControl('' , Validators.required)
    });
    this.issueModel = {
      id: 0,
      asset_number: '',
      Date: new Date(Date.now()),
      description:'',
      status: '',
      reportedBy: ''
    };
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
        this.btnTitle = 'Edit';
          this.title = 'Edit Issue';
        this.issueService.ShowIssue(id).subscribe(result => {
          this.issueModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Issue';
          this.addIssueData();
        } , err => console.log(err));
      }
    });
  }
  onSubmit(){

  }
  addIssueData(){
    if(this.issueModel !== null){
      this.AddForm.setValue({
        asset_number: this.issueModel.asset_number,
        date: this.issueModel.Date,
        status: this.issueModel.status,
        description: this.issueModel.description,
        reportedBy: this.issueModel.reportedBy,
      });
    }
  }

  ValidateModel(){
    this.issueModel.asset_number = this.AddForm.get('asset_number').value;
    this.issueModel.Date = this.AddForm.get('Date').value;
    this.issueModel.status = this.AddForm.get('status').value;
    this.issueModel.reportedBy = this.AddForm.get('reportedBy').value;
    this.issueModel.description = this.AddForm.get('description').value;
  }
}
