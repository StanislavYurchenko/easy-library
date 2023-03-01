import { Component } from '@angular/core';

@Component({
  selector: 'easy-library-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentData = new Date().getFullYear();
}
