import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './../store/auth.actions';
import { AppState } from '../../store/store.reducer';
import { getAuthLoading, getAuthUser } from '../store/auth.selectors';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  loading$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private store: Store<AppState>,
  ) {
    this.loading$ = this.store.select(
      getAuthLoading,
    );
    this.user$ = this.store.select(
      getAuthUser,
    );
  }

  signInWithEmail(email: string, password: string) {
    this.store.dispatch(AuthActions.signIn({email, password}))
  }

  signUpWithEmail(email: string, password: string) {
    this.store.dispatch(AuthActions.signUp({email, password}))
  }

}
