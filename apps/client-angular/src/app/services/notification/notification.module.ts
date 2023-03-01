import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './components';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, MatSnackBarModule],
})
export class NotificationModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NotificationModule,
      providers: [NotificationService],
    };
  }
}
