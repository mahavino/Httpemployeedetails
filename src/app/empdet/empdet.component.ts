import { Component } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-empdet',
  templateUrl: './empdet.component.html',
  styleUrls: ['./empdet.component.css']
})
export class EmpdetComponent {
  constructor(private service:ServiceService){}

empdetarray:any[]=[];
filteredempdetarray:any[]=[];
searchword = ""
employee:any;
details:any;
isEdit = false;
empdata:any;

ngOnInit(){
  this.getdata()
}

getdata(){
  this.service.getting().subscribe((res:any)=>{
    this.empdetarray=res;
    this.filteredempdetarray = res;
  })
}

delete(id:any){
 if(id){
  const conf = window.confirm("Do you want to delete the user?");
  if(conf){
    this.service.deleting(id).subscribe(()=>this.getdata());
  }
 }
}
Dataemit(event:any){
if(event){
  this.getdata()
}
}
search(){
  console.log("Original array:", this.empdetarray); // Check original array
  if(this.searchword){
   this.filteredempdetarray = this.empdetarray.filter(user =>
    user.name.toLowerCase().includes(this.searchword.toLowerCase()) ||
    user.username.toLowerCase().includes(this.searchword.toLowerCase()) ||
    user.email.toLowerCase().includes(this.searchword.toLowerCase()) ||
    user.phone.toString().toLowerCase().includes(this.searchword.toLowerCase()) ||
    user.id.toString().toLowerCase().includes(this.searchword.toLowerCase())
  )
  console.log("Filtered array:", this.filteredempdetarray); // Check filtered results
}
else {
  this.filteredempdetarray = this.empdetarray;
  console.log("Reset to original array:", this.filteredempdetarray);
}
}
}