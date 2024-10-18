import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent {
constructor(private fb:FormBuilder, private service:ServiceService){}

@Input() id:any;
@Input() isedit:any;
@Output() dataemit=new EventEmitter();
empdetails:any;
det:any;
emparray:any[]=[];
isEdit = false;

ngOnInit(){
  this.empdetails = this.fb.group({
    name:[]=["", Validators.required],
    username:[]=["", Validators.required],
    email:[]=["", [Validators.required, Validators.email]],
    phone:[]=["", Validators.required]
  });
  this.service.behsubj.subscribe()
}

add(){
  if(this.empdetails.valid){
  this.service.posting(this.empdetails.value).subscribe(res=>this.dataemit.emit(res));
  this.empdetails.reset()
  }
  else{
    alert("Enter Valid Details!!..")
  }
}

update(){
  this.service.editing(this.id, this.empdetails.value).subscribe(res=>this.dataemit.emit(res))
}
}
