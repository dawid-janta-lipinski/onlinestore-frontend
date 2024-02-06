export interface IUser {
  login: string;
  email: string;
  role: string;
}

export class User implements IUser {
  constructor(
    public login: string,
    public email: string,
    public role: string,
  ) {}
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegisterData {
  login: string;
  email: string;
  password: string;
  role: string;
}
export interface RecoverPasswordData {
  email: string;
}
export interface ChangePasswordData {
  password: string;
  uid: string;
}
export interface AuthResponse {
  timestamp: string;
  message: string;
  code: string;
}
