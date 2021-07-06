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
  };
  IsPrivate = false;
  constructor(private activeRoute: ActivatedRoute,
              private issueService: IssueService,
              private assetService: AssetService) {
              }

  ngOnInit(): void {
    this.assetService.GetAllPrivateAssets().subscribe(list => {
      this.assets = list.data;
      console.log(this.assets);
    } , err => console.log(err));
    this.isEditMode = false;
    this.title = 'Add Issue';
    this.btnTitle = 'Add';
    this.message = '';
    this.AddForm = new FormGroup({
      status: new FormControl('Open' , Validators.required),
      assetId: new FormControl(0),
      description: new FormControl('', Validators.required),
      ownership: new FormControl('public' , Validators.required)
    });
    this.issueModel = {
      id: 0,
      date: new Date(),
      description: '',
      status: '',
      reportedBy: '',
      assetId: 0
    };
    this.keys = Object.keys(this.statuslist);
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if (id){
          this.btnTitle = 'Edit';
          this.title = 'Edit Issue';
          this.issueService.ShowIssue(id).subscribe(result => {
          
          if (result.assetId === 1){
            this.IsPrivate = false;
          }else{
            this.IsPrivate = true;
          }
          this.issueModel = result;
          this.isEditMode = true;
          console.log(this.issueModel);
          this.title = 'Edit Issue';
          this.addIssueData();
        } , err => console.log(err));
      }
    });
  }
  onSubmit(){
    this.ValidateModel();
    console.log(this.issueModel);

    if (!this.isEditMode){
      this.issueService.AddIssue(this.issueModel).subscribe(x => {
        this.message = 'Issue is Added Successfully';
      } , err => console.log(err));
    }
    else{
      this.issueService.EditIssue(this.issueModel.id , this.issueModel).subscribe(x => {
        this.message = 'Issue has updated successfuly';
      } , err => console.log(err));
    }
    this.AddForm.reset();
    this.AddForm.patchValue({
      assetId: 0,
      status: 'Open'
    });
    this.IsPrivate = false;
  }
  addIssueData(){
    if (this.issueModel !== null){
      this.AddForm.patchValue({
        date: this.issueModel.date,
        status: this.issueModel.status,
        description: this.issueModel.description,
        reportedBy: this.issueModel.reportedBy,
        assetId: this.issueModel.assetId
      });
    }
  }

  filter(event){
    if (event.value === 'private' && this.IsPrivate !== true){
      this.IsPrivate = true;
    }
    if (event.value === 'private'){
    }
    else if (event.value === 'public' && this.IsPrivate === false || event.value === 'public'){

      this.IsPrivate = false;
    }
    else if (event.value !== 'public' && event.value !== 'private'){
      this.IsPrivate = false;
    }
  }

  ValidateModel(){
    /*this.issueModel.asset_number = this.AddForm.get('asset_number').value;*/
    this.issueModel.date = new Date();
    this.issueModel.reportedBy = 'Admin';
    this.issueModel.description = this.AddForm.get('description').value;
    this.issueModel.status = this.AddForm.get('status').value;
    if (this.IsPrivate){
      this.issueModel.assetId = this.AddForm.get('assetId').value;
    }else{
      this.issueModel.assetId = 1;
    }
  }
}
