import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empform',
  templateUrl: './empform.component.html',
  styleUrls: ['./empform.component.css']
})
export class EmpformComponent {
constructor(private fb:FormBuilder, private service:ServiceService, private router:Router, private route:ActivatedRoute){
  this.empdetails = this.fb.group({
    name:["", [Validators.required, Validators.pattern('^[A-Z]+[a-z ]+$')]],
    username:["", [Validators.required, Validators.pattern('^[A-Z][a-z]+[@#-_&.][0-9]+$'), this.usernameexists.bind(this)]],
    email:["", [Validators.required, Validators.pattern('^[a-z0-9]+[@][a-z]+[.][a-z]+'), this.emailexists.bind(this)]],
    phone:["", [Validators.required, Validators.pattern('^[0-9]{10}$'), this.phoneexists.bind(this)]]
  });
}

isedit = false;
empdetails:any;
checking:any;
user:any;
usernames:any[]=[];
emails:any[]=[];
phones:any[]=[];

usernameexists(control: FormControl){
  const username = control.value;
  const check = this.usernames.includes(username);
  if(check){
    return { usernameexists:true};
  }
  return null;
}

emailexists(control:FormControl){
  this.checking = control;
  const email = control.value;
  const check = this.emails.includes(email);
  if(check){
    return {emailexists: true}
  }
  return null
}

emailvalidate(control:FormControl){

}

phoneexists(control:FormControl){
  const phone = control.value;
  const check = this.phones.includes(phone);
  if(check){
    return {phoneexists: true}
  }
  return null
}

ngOnInit(){
  console.log(this.checking)
  this.get();
  this.route.params.subscribe(param => {
    if(param && param['id']){
      this.service.gettingById(param['id']).subscribe((res:any)=>{
        this.empdetails.setValue({
          name:res.name,
          username:res.username,
          email:res.email,
          phone:res.phone
        });
        this.isedit = true;
      })
    }
  })
}

add(){
  if(this.empdetails.valid){
  this.service.posting(this.empdetails.value).subscribe()
    this.empdetails.reset();
    this.router.navigate(["/empdet"]);
}
}

update(){
  const id = this.route.snapshot.params['id']; // Get ID from route
    this.service.editing(id, this.empdetails.value).subscribe(() => {
      this.router.navigate(['/empdet']);
    });
}
get(){
  this.service.getting().subscribe((res:any)=>{
    this.usernames = res.map((user:any) => user.username);
    this.emails = res.map((user:any) => user.email);
    this.phones = res.map((user:any) => user.phone);
  })
}
}