import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  updatevar = new EventEmitter()
  idno = new EventEmitter()
  
  posting(data:any){
    return this.http.post('http://localhost:3000/posts', data);
  }
  getting(){
    return this.http.get('http://localhost:3000/posts');
  }
  editing(id:any, data:any){
    return this.http.put(`http://localhost:3000/posts/${id}`, data)
  }
  deleting(id:any){
    return this.http.delete(`http://localhost:3000/posts/${id}`)
  }
  setting(data:any){
    return data
  }
  bool(bool:any){
    this.updatevar.emit(bool);
  }
  idnum(id:any){
    this.idno.emit(id);
  }
}
