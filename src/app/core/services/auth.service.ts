import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { auth } from 'firebase';
import { AuthProvider, User, AuthOptions } from './Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>;

  constructor(
    private fireAuth: AngularFireAuth
  ) {
    this.authState$ = this.fireAuth.authState;
   }

   // create an properties
   get isAuthentication(): Observable<boolean> {
     return this.authState$.pipe(map(user => user !== null));
   }

  // identification of type access with email
  public authentication({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this.singInWIthPopup(provider);
    } else {
      operation = isSignIn ? this.singInWithEmail(user) : this.singUpWithEmail(user);
    }
    return operation;
  }

  // authentication with email
  private singInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // method of authentication with firebase Promise
  private singUpWithEmail({email, password, name}: User): Promise<auth.UserCredential> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(credenciais =>
      credenciais.user.updateProfile({ displayName: name, photoURL: null}).then(() => credenciais));
  }

  // method that will identify the type of authentication
  private singInWIthPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let singInProvider = null;
    switch (provider) {
      case AuthProvider.Facebook:
        singInProvider = new auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        singInProvider = new auth.GoogleAuthProvider();
        break;
      case AuthProvider.Github:
        singInProvider = new auth.GithubAuthProvider();
        break;
    }
    return this.fireAuth.auth.signInWithPopup(singInProvider);
  }

  // method of logout
  public logout(): Promise<void> {
    return this.fireAuth.auth.signOut();
  }

}
