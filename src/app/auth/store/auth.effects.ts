import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, filter, from, map, mergeMap } from "rxjs";
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({providedIn: 'root'})
export class AuthEffects {
  signIn$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({email, password}) =>
        from(this.authService.signInWithEmail(email, password)).pipe(
          filter(user => !!user),
          map(user => user as User),
          map(user => AuthActions.signInSuccessful({user})),
        ),
      ),
      catchError(() => EMPTY),
    ),
  );
  signUp$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.signUp),
      mergeMap(({email, password}) =>
        from(this.authService.signUpWithEmail(email, password)).pipe(
          map(user => AuthActions.signUpSuccessful({user})),
        ),
      ),
      catchError(() => EMPTY),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
  ) {
  }
}
