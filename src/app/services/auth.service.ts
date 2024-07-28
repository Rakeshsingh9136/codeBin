import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth/web-extension';
// import { getAuth, createUserWithEmailAndPassword,UserCredential, signInWithEmailAndPassword, AuthError } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uid?: String;
  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log('User logged in as', user.email);
      } else {
        this.uid = undefined;
        console.log('User Log Out');
      }
    });
  }
  isauthenticated(){
    return this.uid?true:false;
  }
  getUid(){
    return this.uid;
  }

  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        console.log('Registration successful!', user);
        this.router.navigate(['/']); // Navigate to home page after successful registration
      })
      .catch((error: AuthError) => {
        const errorMessage = error.message;
        console.error('Registration Error:', errorMessage);
        alert('Registration failed. Please try again.'); // Display error message to the user
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        alert('You are login Successfull');
        console.log('Login successful!', user);
        this.router.navigate(['/']); // Navigate to home page after successful login
      })
      .catch((error: AuthError) => {
        const errorMessage = error.message;
        console.error('Login Error:', errorMessage);
        alert('Login failed. Invalid email or password.'); // Display error message to the user
      });
  }
  logout() {
    const auth = getAuth();
    signOut(auth).catch((error) => {
      alert('Something went wrong !!! Please try again.');
      // An error happened.
    });
  }
}
