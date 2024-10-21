import { Pipe, PipeTransform } from '@angular/core';
import { ServiceService } from './service.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
  name: 'validate',
  pure: false
})
export class ValidatePipe implements PipeTransform {
  constructor(private service:ServiceService){}

  transform(value: string, type: 'username' | 'email'): Observable<boolean> {
    return this.service.getting().pipe(
      map((users:any) => {
        return !users.some((user:any) => user[type] === value);
      }),
      catchError(() => of(true)) // If the request fails, assume the value is valid
    );
  }
}
