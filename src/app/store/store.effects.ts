import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from "@ngrx/effects";
import { catchError, EMPTY, filter, from, map, mergeMap, tap } from "rxjs";
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../auth/models/user';
import * as AuthActions from './../auth/store/auth.actions';

@Injectable({providedIn: 'root'})
export class StoreEffects {
  init$ = createEffect(() => this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() =>
        from(this.authService.listenerUser()).pipe(
          map(user => user as User),
          tap(user => {
            if (user) {
             console.log(user)
            }
          }),
          map(user => AuthActions.signInSuccessful({user})),
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
