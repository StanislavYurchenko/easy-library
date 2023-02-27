import { Injectable } from '@angular/core';

const TOKEN_KEY =
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuZ3VsYXItZGV2ZWxvcGVyLTEyQG1haWwuY29tIiwic3ViIjoiNjNmYjVkNjRhNjFjMWIzN2M1MTllZWU1IiwiaWF0IjoxNjc3NDMwMzIyLCJleHAiOjE2Nzc0NDIzMjJ9.Gej05qLjI9ul_VuOWgwtSIRZS_FGmkpOYu1QhhM_mgc';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TokenService {
   getToken(): string | null {
      return TOKEN_KEY || localStorage.getItem(TOKEN_KEY);
   }

   setToken(token: string): void {
      localStorage.setItem(TOKEN_KEY, token);
   }

   removeToken(): void {
      localStorage.removeItem(TOKEN_KEY);
   }
}
