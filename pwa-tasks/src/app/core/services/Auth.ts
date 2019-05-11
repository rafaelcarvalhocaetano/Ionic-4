
export interface User {
  name?: string;
  email: string;
  password: string;
}

export enum AuthProvider {
  Email,
  Facebook,
  Google,
  Github
}

export interface AuthOptions {
  isSingIn: boolean;
  provider: AuthProvider;
  user: User;
}