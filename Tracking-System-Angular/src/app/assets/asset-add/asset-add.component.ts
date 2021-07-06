import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Asset, TypeItem } from '../../Models/Asset';
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
  typeList = [ {name:'Motor Vehicles' , ownership: 'private'}, 
  {name:'Railed Vehicles', ownership:'public'}];

  editUrl: string;
  subTypeList = [];
  allSubType = [{name: "motorCycles" , type: "Motor Vehicles"} , 
                {name: "cars" , type: "Motor Vehicles"},
                {name: "trucks" , type: "Motor Vehicles"} , 
                {name: "buses" , type: "Motor Vehicles"} , 
                {name: "trains" , type: "Railed Vehicles"}, 
                {name: "trams" , type: "Railed Vehicles"}];
  message: string;
  subTypeAfterEvent = [];
  TypeAfterEvent = [];
  NameExist: boolean;
  AssetNumberExist: boolean;
  errorMessage = {
    name: {
      required: 'name is required',
      nameExist: ''
    },
    type: {
      required: 'Type is required'
    },
    assetNumber: {
      required: 'Number is required',
      Exist: ''
    },
  }
  IsPrivate = false;
  constructor(private activeRoute: ActivatedRoute, 
              private assetService: AssetService) { }

  ngOnInit(): void {
    this.NameExist = true;
    this.message = '';
    this.isEditMode = false;
    this.btnTitle = 'Add';
    this.title = 'Add Asset';
    this.AddForm = new FormGroup({
      name: new FormControl('' , Validators.required),
      type: new FormControl('' , Validators.required),
      subType: new FormControl('' , Validators.required),
      description: new FormControl(''),
      assetNumber: new FormControl(''),
      Publicity: new FormControl('' , Validators.required)
    });
    this.assetModel = {
      id:0,
      name:'',
      type:'',
      subType:'',
      description:'',
      assetNumber:''
    }
    this.activeRoute.paramMap.subscribe(param => {
      const id = +param.get('id');
      if(id){
        this.assetService.ShowAsset(id).subscribe(result => {
          if(result.assetNumber === ''){
            this.IsPrivate = false;
            this.TypeAfterEvent = this.typeList.filter(t => t.ownership === 'public');
            this.subTypeAfterEvent = this.allSubType.filter(t => t.type === result.type);
          }else{
            this.IsPrivate = true;
            this.TypeAfterEvent = this.typeList.filter(t => t.ownership === 'private');
            this.subTypeAfterEvent = this.allSubType.filter(t => t.type === result.type);
          }
          this.assetModel = result;
          this.isEditMode = true;
          this.btnTitle = 'Edit';
          this.title = 'Edit Asset';
          this.addAssetData();
          console.log(this.assetModel);
        } , err => console.log(err));
      }
    });
  }

  onTypeChange(){
    const selectedType = this.AddForm.get('type').value;
    this.subTypeAfterEvent = this.allSubType.filter(t => t.type === selectedType);
  }

  onSubmit(){
    this.ValidateModel();
    console.log(this.AddForm);
    if(!this.isEditMode){
      this.assetService.AddAsset(this.assetModel).subscribe(result => {
        this.message = 'Asset has added successfuly'
      } , err => console.log(err));
    }
    else{
      this.assetService.EditAsset(this.assetModel).subscribe(x => {
        this.message = 'Asset has updated successfuly'
      } , err => console.log(err));
    }
    this.AddForm.reset();
    this.subTypeAfterEvent = [];
    this.TypeAfterEvent = [];
    this.AddForm.patchValue({
      type: '',
      subType: ''
    });
    this.IsPrivate = false;
  }
  addAssetData(){
    if(this.assetModel !== null){
      this.AddForm.patchValue({
        name: this.assetModel.name,
        type: this.assetModel.type,
        subType: this.assetModel.subType,
        description: this.assetModel.description,
        assetNumber: this.assetModel.assetNumber,
      });
    }
    console.log(this.assetModel.type);
  }
  isAssetNameExist(){
    const name = this.AddForm.value.name;
    if (name != null && name !== '' && !this.isEditMode){
      this.assetService.IsNameExists(name).subscribe(suc => {
        this.errorMessage.name.nameExist = 'This Asset Name is used';
        this.NameExist = true;
      }, err => {
        this.errorMessage.name.nameExist = '';
        this.NameExist = false;
        });
      return true;
    }
    return false;
  }
  isAssetNumberExist(){
    const number = this.AddForm.value.assetNumber;
    if (number != null && number !== '' && !this.isEditMode){
      this.assetService.IsNumberExists(number).subscribe(suc => {
        this.errorMessage.assetNumber.Exist = 'This Asset number is used';
        this.AssetNumberExist = true;
      }, err => {
        this.errorMessage.assetNumber.Exist = '';
        this.AssetNumberExist = false;
        });
      return true;
    }
    return false;
  }
  filter(event){
    if(event.value == 'private' && this.IsPrivate != true){
      this.IsPrivate = true;
      this.TypeAfterEvent = this.typeList.filter(t => t.ownership === event.value);
    }
    if(event.value== 'private'){
      this.TypeAfterEvent = this.typeList.filter(t => t.ownership === event.value);
    }
    else if(event.value == 'public' && this.IsPrivate == false || event.value == 'public'){
      this.IsPrivate = false;
      this.TypeAfterEvent = this.typeList.filter(t => t.ownership === event.value);
    }
    else if(event.value != 'public' && event.value != 'private'){
      this.IsPrivate = false;
      this.TypeAfterEvent = [];
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
