import { createAction, props } from "@ngrx/store";
import { User } from '../models/user';

export const signIn = createAction(
  '[Auth Page] Sign in',
  props<{ email: string; password: string }>(),
);
export const signInSuccessful = createAction(
  '[Auth Page] Sign in successful',
  props<{ user: User}>(),
);
export const signUp = createAction(
  '[Auth Page] Sign up',
  props<{ email: string; password: string }>(),
);
export const signUpSuccessful = createAction(
  '[Auth Page] Sign up successful',
  props<{ user: User}>(),
);
