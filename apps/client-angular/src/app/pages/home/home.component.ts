import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRes, Book } from '@libs/api-interface';

@Component({
  selector: 'easy-library-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  books$: Observable<ApiRes<Book[]>> | null = null;

  constructor(private readonly http: HttpClient) {}

  getData() {
    this.books$ = this.http.get<ApiRes<Book[]>>('/api/books');
  }
}
