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

}