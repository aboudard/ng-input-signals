import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserRights(user: string): Observable<string> {
    if (user === 'bill') {
      return of('admin');
    } else {
      return of('user');
    }
  }

  getProductById(id: string): Observable<string> {
    if (id === '12') {
      return of('Marvelous product 12 from service');
    } else {
      return of('Other product from service');
    }
  }

}
