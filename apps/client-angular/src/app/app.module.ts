import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ContentInputComponent,
  AuthorInputComponent,
  TitleInputComponent,
} from './components/valueAccessor/inputs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LockInputComponent } from './components/valueAccessor/inputs/lock-input/lock-input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  KebabComponent, RegistrationFormComponent,
  StreamsComponent,
  ValueAccessorComponent,
} from './components';
import {
  FieldErrorsComponent
} from "./components/registration-form/shared/form-elements/field-errors/field-errors.component";
import {
  PasswordInputComponent
} from "./components/registration-form/shared/form-elements/password-input/password-input.component";
import {InputComponent} from "./components/registration-form/shared/form-elements/input/input.component";

@NgModule({
  declarations: [
    AppComponent,
    KebabComponent,
    StreamsComponent,
    ValueAccessorComponent,
    AuthorInputComponent,
    ContentInputComponent,
    TitleInputComponent,
    LockInputComponent,
    FieldErrorsComponent,
    PasswordInputComponent,
    InputComponent,
    RegistrationFormComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
