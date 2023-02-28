import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RatingComponent } from './rating.component';
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [RatingComponent],
})
export class RatingModule {}
