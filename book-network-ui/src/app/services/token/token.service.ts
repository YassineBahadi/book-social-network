import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    clearToken(): void {
    localStorage.removeItem('token');
    this.token = null as any;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token') as string;
  }

}
