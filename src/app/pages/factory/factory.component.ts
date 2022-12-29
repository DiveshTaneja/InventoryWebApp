import { Component, OnInit } from '@angular/core';
import { FactoryDTO } from 'src/app/interfaces/factory-dto';
import { FactoryService } from 'src/app/services/factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FactoryModel } from 'src/app/models/factory-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {

  factories!: FactoryDTO[];
  formValue!: FormGroup;
  factoryObj: FactoryModel;
  isUpdatingFactory:boolean=false;
  constructor(private factoryService: FactoryService,
     private formBuilder: FormBuilder,
     private router: Router
     ) {
    this.getFactories();
    this.factoryObj = new FactoryModel();
    this.formValue = this.formBuilder.group({
      factoryName: [''],
      factoryLocation: ['']
    })
  }

  ngOnInit(): void {
  }

  getFactories() {
    this.factoryService.getAllFactories().subscribe(
      response => {
        this.factories = response;
        console.log(JSON.stringify(this.factories));
      }
    )
  }
  addFactory() {
    this.formValue.reset();
    this.formValue.controls['factoryName'].setValue('');
    this.formValue.controls['factoryLocation'].setValue('');
    this.factoryObj=new FactoryModel();
    this.factoryObj.factoryName = this.formValue.value.factoryName;
    this.factoryObj.factoryLocation = this.formValue.value.factoryLocation;
    this.factoryService.addFactory(this.factoryObj).subscribe(
      response => {
        console.log(JSON.stringify(response));
        alert("Factory Added Successfully");
        this.formValue.reset();
        let ref=document.getElementById("cancel");
        ref.click();
        this.getFactories();
      }
    )
  }
  deleteFactory(factoryId:number){
    this.factoryService.deleteFactory(factoryId).subscribe(
      response=>{
        console.log(JSON.stringify(response));
        alert("Factory Deleted");
        this.getFactories();
      }
      ,
      errr=>{
        console.log(errr);
      }
    )
  }
  onEdit(factory:FactoryDTO){
    this.isUpdatingFactory=true;
    this.factoryObj.factoryId=factory.factoryId;
    this.formValue.controls['factoryName'].setValue(factory.factoryName);
    this.formValue.controls['factoryLocation'].setValue(factory.factoryLocation);
  }

  updateFactory(){
    this.factoryObj.factoryName = this.formValue.value.factoryName;
    this.factoryObj.factoryLocation = this.formValue.value.factoryLocation;
    this.factoryService.updateFactory(this.factoryObj).subscribe(
      response=>{
        console.log(response);
        alert("Factory Updated Successfully");
        this.formValue.reset();
        let ref=document.getElementById("cancel");
        ref.click();
        this.getFactories();
        this.isUpdatingFactory=false;
      }
    )
  }
  navigateToProduct(factoryId:number){
    this.router.navigate(['/factory',factoryId]);
  }

}
