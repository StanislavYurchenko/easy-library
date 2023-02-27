import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('https://api.example.com/authenticate', { username, password }).pipe(
         tap((response) => {
            const token = response.access_token;

            this.tokenService.setToken(token);
            this.authenticatedSubject.next(true);
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
