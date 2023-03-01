import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AppRoutingModule } from './app.routing.module';
import { FooterModule, HeaderModule } from './pages';
import { AuthInterceptor } from './interceptors';
import { NotificationModule } from './services';
import { ButtonModule, ControlsModule, RatingModule } from './shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    HeaderModule,
    ControlsModule,
    NotificationModule.forRoot(),
    MatCardModule,
    RatingModule,
    ButtonModule,
    MatSidenavModule,
    FooterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
