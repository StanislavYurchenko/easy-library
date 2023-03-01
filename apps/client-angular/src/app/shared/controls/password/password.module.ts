import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from './password.component';

@NgModule({
  declarations: [PasswordComponent],
  imports: [CommonModule, MatIconModule],
  exports: [PasswordComponent],
})
export class PasswordModule {}
