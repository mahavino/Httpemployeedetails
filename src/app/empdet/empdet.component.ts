import { Component, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { EmpformComponent } from '../empform/empform.component';

@Component({
  selector: 'app-empdet',
  templateUrl: './empdet.component.html',
  styleUrls: ['./empdet.component.css']
})
export class EmpdetComponent {
  constructor(private service:ServiceService){}

  @ViewChild(EmpformComponent)
  empdet!: EmpformComponent

empdetarray:any[]=[];
details:any;
isEdit = false;
empdata:any;
empid:any;

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
this.empdet.empdetails.setValue({
  name: data.name,
  username: data.username,
  email: data.email,
  phone: data.phone
});
this.empid = id;
}
delete(id:any){
  this.service.deleting(id).subscribe();
  this.getdata();
}
Dataemit(event:any){
if(event){
  this.getdata()
}
}
}