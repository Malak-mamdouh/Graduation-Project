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
  assetModel: Asset;
  isEditMode: boolean;
  btnTitle: string;
  title: string;
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
    this.isEditMode = false;
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
      asset_Number:'',
      url:''
    }
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
        this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
        this.assetService.ShowAsset(id).subscribe(result => {
          this.assetModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
          this.addAssetData();
        } , err => console.log(err));
      }
    });
  }

  onSubmit(){
    this.ValidateModel();
    console.log(this.assetModel);
    this.AddForm.reset();
  }
  addAssetData(){
    if(this.assetModel !== null){
      this.AddForm.setValue({
        name: this.assetModel.name,
        type: this.assetModel.type,
        subType: this.assetModel.subType,
        description: this.assetModel.description,
        assetNumber: this.assetModel.asset_Number,
      });
    }
  }
  ValidateModel(){
    this.assetModel.name = this.AddForm.get('name').value;
    this.assetModel.type = this.AddForm.get('type').value;
    this.assetModel.subType = this.AddForm.get('subType').value;
    this.assetModel.description = this.AddForm.get('description').value;
    this.assetModel.asset_Number = this.AddForm.get('assetNumber').value;
  }
}
