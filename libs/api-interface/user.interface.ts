export interface User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
}

export interface ErrorRes {
  readonly statusCode: number;
  readonly message: string;
  readonly error?: string;
}

export interface UserRes {
  readonly message: string;
  readonly user: User;
}

export interface UsersRes {
  readonly message: string;
  readonly users: User[];
}
