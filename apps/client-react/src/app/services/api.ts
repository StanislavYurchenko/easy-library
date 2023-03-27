import axios, { AxiosResponse } from 'axios';
import { Book, ApiRes } from '@libs/api-interface';

const AUTH_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ3VsYXItZGV2ZWxvcGVyLTFAbWFpbC5jb20iLCJzdWIiOiI2M2VmZjRiZDk1MjcyNDAwNWE0NDEyYjIiLCJpYXQiOjE2Nzk5MTQ4MjMsImV4cCI6MTY3OTkyNjgyM30.sj5VCf_etI44CUNKEEN78L5NbqUOSW9s7atQa3CWBuY';

const instance = axios.create({
  baseURL: 'http://localhost:3333/api',
});

instance.defaults.headers.common.Authorization = AUTH_TOKEN;

export function getBooks(): Promise<Book[]> {
  return instance.get('/books').then(res => {
    const { data } = res;

    return data ? data.data : ([] as Book[]);
  });
}
