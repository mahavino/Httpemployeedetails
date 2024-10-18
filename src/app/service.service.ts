import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  private subj = new BehaviorSubject<any[]>([]);
  behsubj = this.subj.asObservable();
  
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
  updatedet(data:any[]){
    this.subj.next(data)
  }
}
