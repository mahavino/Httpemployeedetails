import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent {
constructor(private fb:FormBuilder, private service:ServiceService, private router:Router){}

id:any;
isedit:any;
empdetails:any;
det:any;
resp:any;
emparray:any[]=[];
isEdit = false;

ngOnInit(){
  this.empdetails = this.fb.group({
    name:[]=["", [Validators.required, Validators.pattern('^[A-Z]{1}[a-z ]+$')]],
    username:[]=["", [Validators.required, Validators.pattern('^[A-Z][a-z]+[@#-_&.][0-9]+$')]],
    email:[]=["", [Validators.required, Validators.email]],
    phone:[]=["", [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });
  // Add asynchronous validation for username and email
  this.empdetails.get('username')?.valueChanges.pipe(
    switchMap(value => this.service.getting().pipe(
      map((users:any) => !users.some((user:any) => user.username === value))
    ))
  ).subscribe((isValid: any) => {
    if (!isValid) {
      this.empdetails.get('username')?.setErrors({ usernameTaken: true });
    }
  });

  this.empdetails.get('email')?.valueChanges.pipe(
    switchMap(value => this.service.getting().pipe(
      map((users:any) => !users.some((user:any) => user.email === value))
    ))
  ).subscribe((isValid: any) => {
    if (!isValid) {
      this.empdetails.get('email')?.setErrors({ emailTaken: true });
    }
  });
  this.service.setting(this.empdetails).subscribe((res:any)=>{
    if(res){
      this.empdetails.setValue({
        name: res.name,
        username: res.username,
        email: res.email,
        phone: res.phone
      });
      this.isedit = this.service.updatevar
      this.id = this.service.idno
    }
  })
}

add(){
  if(this.empdetails.valid){
  this.service.posting(this.empdetails.value).subscribe();
  this.empdetails.reset();
  this.router.navigate(["/empdet"]);
  }
  else{
    alert("Enter Valid Details!!..")
  }
}

update(){
  if(this.empdetails.valid){
  this.service.editing(this.id, this.empdetails.value).subscribe(()=>this.router.navigate(["/empdet"]));
  }
}
}
