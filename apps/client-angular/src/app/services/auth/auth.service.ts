import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, catchError, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccessToken, ApiRes } from '@libs/api-interface';
import { TokenService } from '../token/token.service';
import { IAuthBodyRequest } from '../../models';
import { NavigatorService } from '../navigator';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticatedSubject = new BehaviorSubject<boolean>(false);
  public authenticated$ = this.authenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private nav: NavigatorService,
    private notification: NotificationService,
  ) {}

  login(req: IAuthBodyRequest): Observable<any> {
    return this.http.post<any>('/api/auth/login', req).pipe(
      tap((res: ApiRes<AccessToken>) => {
        const { data, message } = res;
        const token = data?.accessToken ?? '';

        this.tokenService.setToken(token);
        this.notification.success(message);
        this.authenticatedSubject.next(true);
        this.nav.goHome();
      }),
      catchError(() => {
        this.notification.error('Oops! Something is wrong');

        return EMPTY;
      }),
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
