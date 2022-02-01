import { createSelector } from "@ngrx/store";
import { selectAuth } from '../../store/store.selectors';
import { AuthState } from './auth.reducer';

export const getAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading
);

export const getAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state?.user
);
