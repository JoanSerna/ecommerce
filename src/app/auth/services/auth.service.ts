import { Injectable } from '@angular/core';
import {
  Auth,
  authState, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential as UserFirebase,
} from '@angular/fire/auth';
import { from, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  collection,
  CollectionReference,
  doc,
  docData,
  Firestore, setDoc,
} from '@angular/fire/firestore';
import { User } from '../models/user';
import { Collections } from '../../utils/collections';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | undefined | null;
  private readonly userDisposable: Subscription | undefined;
  private readonly userCollectionRef: CollectionReference<User>

  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore,
  ) {
    this.userCollectionRef = collection(this.firestore, Collections.Users).withConverter<User>({
      toFirestore: (dataStore) => ({...dataStore}),
      fromFirestore: (object): User => ({...(object.data() as User)}),
    });
    this.listenerUser();
  }

  listenerUser(): void {
    authState(this.auth).pipe(
      traceUntilFirst('auth'),
      switchMap(user => this.getUserByKey(user?.uid ?? '')),
      tap(user => this.user = user),
    ).subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  signInWithEmail(email: string, password: string): Observable<User | null> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => this.getUserByKey(user?.uid ?? '')),
    );
  }

  signUpWithEmail(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => from(this.createUser({
          key: user?.uid ?? '',
          email: user?.email ?? '',
          name: '',
        })).pipe(map(() => ({
          key: user?.uid ?? '',
          email: user?.email ?? '',
          name: '',
        }))),
      ),
    );
  }

  dispose(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async logout() {
    return await signOut(this.auth);
  }

  getUserByKey(key: string): Observable<User | null> {
    if (key) {
      const ref = doc<User>(this.userCollectionRef, key);
      return docData<User>(ref)
    }
    return of(null)
  }

  createUser(user: User): Promise<void> {
    const ref = doc(this.userCollectionRef, user.key);
    return setDoc(ref, user);
  }
}
