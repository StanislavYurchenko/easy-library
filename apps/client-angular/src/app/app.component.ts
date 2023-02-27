import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'easy-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-angular';
  dataFromServer = '';

  constructor(private readonly http: HttpClient) {}

  getData() {
    this.http.get<{ message: string }>('/api/books').subscribe(({ message }) => (this.dataFromServer = message));
  }
}
