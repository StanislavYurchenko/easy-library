/* eslint-disable no-void */
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavigatorPage } from './navigator.interfaces';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
  private currentUrl = '';

  constructor(private readonly router: Router) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationEnd) {
        this.currentUrl = routerEvent.url;
      }
    });
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }

  goSignIn(): void {
    void this.router.navigate([NavigatorPage.login], {});
  }
}
