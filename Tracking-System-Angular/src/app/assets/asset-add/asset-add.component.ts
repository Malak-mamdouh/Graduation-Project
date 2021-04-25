import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Asset } from '../../Models/Asset';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.css']
})
export class AssetAddComponent implements OnInit {

  AddForm: FormGroup;
  response: {url : ''};
  assetModel: Asset;
  isEditMode: boolean;
  btnTitle: string;
  title: string;
  editUrl: string;
  message: string;
  errorMessage = {
    name: {
      required: 'name is required'
    },
    type: {
      required: 'type is required'
    },
    description: {
      required: 'Description is required'
    },
    assetNumber: {
      required: 'Number is required'
    },
  }
  constructor(private activeRoute: ActivatedRoute, 
              private assetService: AssetService) { }

  ngOnInit(): void {
    this.response = {
      url : ''
    };
    this.message = '';
    this.isEditMode = false;
    this.editUrl = ''
    this.btnTitle = 'Add';
    this.title = 'Add Asset';
    this.AddForm = new FormGroup({
      name: new FormControl('' , Validators.required),
      type: new FormControl('' , Validators.required),
      subType: new FormControl('' , Validators.required),
      description: new FormControl('' , Validators.required),
      assetNumber: new FormControl('' , Validators.required)
    });
    this.assetModel = {
      id:0,
      name:'',
      type:'',
      subType:'',
      description:'',
      assetNumber:'',
      url:''
    }
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
    
        this.assetService.ShowAsset(id).subscribe(result => {
          this.assetModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
          this.editUrl = this.assetModel.url;
          this.addAssetData();
        } , err => console.log(err));
      }
    });
  }

  public uploadFinished = (event) =>{
    this.response = event;
  }
  onSubmit(){
    this.ValidateModel();
    if(!this.isEditMode){
      this.assetModel.url = this.response.url;
      this.assetService.AddAsset(this.assetModel).subscribe(result => {
        this.message = 'Asset has added successfuly'
      } , err => console.log(err));
    }
    else{
      if (this.editUrl !== null && this.response.url == ''){
        this.assetModel.url = this.editUrl;
        console.log(this.assetModel.url);
      }
      else{
        this.assetModel.url = this.response.url;
      }
      this.assetService.EditAsset(this.assetModel).subscribe(x => {
        this.message = 'Asset has updated successfuly'
      } , err => console.log(err));
    }
    
    this.AddForm.reset();
  }
  addAssetData(){
    if(this.assetModel !== null){
      this.AddForm.setValue({
        name: this.assetModel.name,
        type: this.assetModel.type,
        subType: this.assetModel.subType,
        description: this.assetModel.description,
        assetNumber: this.assetModel.assetNumber,
      });
    }
  }
  ValidateModel(){
    this.assetModel.name = this.AddForm.get('name').value;
    this.assetModel.type = this.AddForm.get('type').value;
    this.assetModel.subType = this.AddForm.get('subType').value;
    this.assetModel.description = this.AddForm.get('description').value;
    this.assetModel.assetNumber = this.AddForm.get('assetNumber').value;
  }
}
