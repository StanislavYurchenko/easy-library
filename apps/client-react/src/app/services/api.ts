import axios from 'axios';
import { Book, ApiRes } from '@libs/api-interface';

// const AUTH_TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ3VsYXItZGV2ZWxvcGVyLTFAbWFpbC5jb20iLCJzdWIiOiI2M2VmZjRiZDk1MjcyNDAwNWE0NDEyYjIiLCJpYXQiOjE2ODAwMjUyMzIsImV4cCI6MTY4MDAzNzIzMn0.0N-a-ud-_eCgK-ECxJskeVSzFBucIeJQG5GDgrOFjzc';

export const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
});

// instance.defaults.headers.common.Authorization = AUTH_TOKEN;

export function getBooks(): Promise<Book[]> {
  return instance.get<ApiRes<Book[]>>('/books').then(({ data }) => data.data || []);
}
