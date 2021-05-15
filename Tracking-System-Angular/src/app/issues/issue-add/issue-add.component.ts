import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Issue, Estatus } from '../../Models/Issue';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';
import { AssetService } from '../../assets/asset.service';
import { Asset } from '../../Models/Asset';

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
  keys = [];
  assets: Asset[] = [];
  message: string;
  /*statusList = [{id:1 , name:'Open'} , {id:2 , name:'Resolved'} , {id:3 , name:'Closed'}];*/
  statuslist = Estatus;
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
              private issueService: IssueService, 
              private assetService: AssetService) { 
              }

  ngOnInit(): void {
    this.assetService.AllAssets().subscribe(list => {
      this.assets = list
    } , err => console.log(err));
    this.isEditMode = false;
    this.title = 'Add Issue';
    this.btnTitle = 'Add';
    this.message = '';
    this.AddForm = new FormGroup({
      status: new FormControl('Open' , Validators.required),
      date: new FormControl(new Date() , Validators.required),
      description: new FormControl('' , Validators.required),
      reportedBy: new FormControl('' , Validators.required),
      assetId: new FormControl(0)
    });
    this.issueModel = {
      id: 0,
      Date: new Date(),
      description:'',
      status: '',
      reportedBy: '',
      assetId: 0
    };
    this.keys = Object.keys(this.statuslist);
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
          this.btnTitle = 'Edit';
          this.title = 'Edit Issue';
        this.issueService.ShowIssue(id).subscribe(result => {
          this.issueModel = result;
          this.isEditMode = true;
          
          this.title = 'Edit Issue';
          this.addIssueData();
        } , err => console.log(err));
      }
    });
  }
  onSubmit(){
    this.ValidateModel();
    console.log(this.issueModel);
    this.issueService.AddIssue(this.issueModel).subscribe(x => {
      this.message = 'Issue is Added Successfully';
    } , err => console.log(err));
    this.AddForm.reset();
  }
  addIssueData(){
    if(this.issueModel !== null){
      this.AddForm.setValue({
        date: this.issueModel.Date,
        status: this.issueModel.status,
        description: this.issueModel.description,
        reportedBy: this.issueModel.reportedBy,
        assetId: this.issueModel.assetId
      });
    }
  }

  ValidateModel(){
    /*this.issueModel.asset_number = this.AddForm.get('asset_number').value;*/
    this.issueModel.Date = this.AddForm.get('date').value;
    this.issueModel.reportedBy = this.AddForm.get('reportedBy').value;
    this.issueModel.description = this.AddForm.get('description').value;
    this.issueModel.status = this.AddForm.get('status').value;
    this.issueModel.assetId =this.AddForm.get('assetId').value;
  }
}
