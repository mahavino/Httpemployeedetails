import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { EmpformComponent } from '../empform/empform.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empdet',
  templateUrl: './empdet.component.html',
  styleUrls: ['./empdet.component.css']
})
export class EmpdetComponent {
  constructor(private service:ServiceService, private router:Router){}

  @ViewChild(EmpformComponent)
  empdet!: EmpformComponent

empdetarray:any[]=[];
details:any;
isEdit = false;
empdata:any;

ngOnInit(){
  this.getdata()
}

getdata(){
  this.service.getting().subscribe((res:any)=>{
    this.empdetarray=res;
  })
}
edit(id:any, data:any){
  this.isEdit = true;
if(this.isEdit){
  this.service.bool(this.isEdit);
  this.service.idnum(id)
  this.service.setting(data)
this.router.navigate(["/empform"])
}
}
delete(id:any){
 if(id){
  const conf = confirm("Do you want to delete the user?");
  if(conf){
    this.getdata();
    this.service.deleting(id).subscribe();
  }
 }
}
Dataemit(event:any){
if(event){
  this.getdata()
}
}
}