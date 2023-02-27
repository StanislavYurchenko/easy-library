import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {ApiRes, Book} from "@libs/api-interface";

@Component({
  selector: 'easy-library-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client-angular';
  dataFromServer: any = null;
  books: Book[] = [];


  constructor(private readonly http: HttpClient) {}

  getData() {
    this.http.get<ApiRes<Book[]>>('/api/books').subscribe((res: ApiRes<Book[]>) => {
      this.dataFromServer = res.message;
      this.books = res.data ?? [];
  });
  }
}
