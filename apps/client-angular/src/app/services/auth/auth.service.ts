import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import {IAuthBodyRequest} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService, private route: Router) {}

  login(req: IAuthBodyRequest): Observable<any> {
    return this.http.post<any>('/api/auth/login', req).pipe(
         tap((response) => {
            const token = response.access_token;

            this.tokenService.setToken(token);
            this.authenticatedSubject.next(true);
            void this.route.navigate(['']);
         })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();

    return !!token;
  }
}
