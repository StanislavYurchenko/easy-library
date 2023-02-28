import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRes, Book } from '@libs/api-interface';

@Component({
  selector: 'easy-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  books$: Observable<ApiRes<Book[]>> | null = null;

  constructor(private readonly http: HttpClient) {}

  getData() {
    this.books$ = this.http.get<ApiRes<Book[]>>('/api/books');
  }
}
