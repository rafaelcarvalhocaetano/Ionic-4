import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }


  private singInWithEmail({ email, password }): Promise<auth.UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // method of authentication with firebase Promise
  private singUpWithEmail({email, password, name}): Promise<auth.UserCredential> {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(credenciais =>
      credenciais.user.updateProfile({ displayName: name, photoURL: null}).then(() => credenciais));
  }

  // method that will identify the type of authentication
  private singInWIthPopup(provider: string): Promise<auth.UserCredential> {
    let singInProvider = null;

    switch (provider) {
      case 'facebook':
        singInProvider = new auth.FacebookAuthProvider();
        break;
      case 'google':
        singInProvider = new auth.GoogleAuthProvider();
        break;
      case 'github':
        singInProvider = new auth.GithubAuthProvider();
        break;
    }

    return this.fireAuth.auth.signInWithPopup(singInProvider);
  }

}
