import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

 const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.signUp, (state) => ({
      ...state,
      loading: true,
    })),
    on(AuthActions.signUpSuccessful, (state, {user}) => ({
      ...state,
      loading: false,
      user,
    })),
    on(AuthActions.signIn, (state) => ({
      ...state,
      loading: true,
    })),
    on(AuthActions.signInSuccessful, (state, {user}) => ({
      ...state,
      loading: false,
      user,
    })),
  ),
});
