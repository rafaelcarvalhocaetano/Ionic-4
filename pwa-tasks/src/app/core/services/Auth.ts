
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
  isSignIn: boolean;
  provider: AuthProvider;
  user: User;
}