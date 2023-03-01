import { Component } from '@angular/core';
import { NavigatorService } from '../../services';

@Component({
  selector: 'easy-library-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private nav: NavigatorService) {}

  get navigator(): NavigatorService {
    return this.nav;
  }
}
