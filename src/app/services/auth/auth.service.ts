import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/models/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {}


    async loginGoogle(): Promise<User> {
      try {
        const { user } = await this.afAuth.signInWithPopup(
          new auth.GoogleAuthProvider()
        );
        this.updateUserData(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    }
 

    private updateUserData(user: User) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${user.uid}`
      );
  
      const data: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: 'ADMIN',
      };
  
      return userRef.set(data, { merge: true });
    }

    async logout(): Promise<void> {
      try {
        await this.afAuth.signOut();
      } catch (error) {
        console.log(error);
      }
    }

    async resetPassword(email: string): Promise<void> {
      try {
        return this.afAuth.sendPasswordResetEmail(email);
      } catch (error) {
        console.log(error);
      }
    }
  
    async sendVerificationEmail(): Promise<void> {
      return (await this.afAuth.currentUser).sendEmailVerification();
    }
  
    async login(email: string, password: string): Promise<User> {
      try {
        const { user } = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        this.updateUserData(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    }
  
    async register(email: string, password: string): Promise<User> {
      try {
        const { user } = await this.afAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        await this.sendVerificationEmail();
        return user;
      } catch (error) {
        console.log(error);
      }
    }

}