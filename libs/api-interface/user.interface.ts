export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  readonly isAdmin?: boolean;
}

export type Login = Pick<User, 'email' | 'password'>;
