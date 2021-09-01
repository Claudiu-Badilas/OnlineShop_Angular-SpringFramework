const user: User = {
  id: '1',
  firstName: 'Test',
  lastName: 'Test',
  email: 'admin',
  username: 'admin',
  profileImageUrl: 'http://localhost:8080/user/image/profile/admin',
  lastLoginDate: '2021-08-31T18:57:40.000+00:00',
  lastLoginDateDisplay: '2021-08-29T18:20:15.000+00:00',
  joinDate: '2021-08-29T18:20:10.000+00:00',
  role: 'ROLE_ADMIN',
  authorities: ['user:read'],
  active: true,
  notLocked: true,
};

import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from 'src/app/models/user';
import * as UserActions from './user.actions';

export interface UserState {
  user: User;
  error: string;
}

const initialState: UserState = {
  user: user,
  error: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => {
    return {
      ...state,
      user: state.user,
    };
  }),
  on(UserActions.loadUserSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(UserActions.loadUserFailure, (state, action) => {
    return {
      ...state,
      user: null,
      error: action.error,
    };
  })
);

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserFeatureState,
  (state) => state.user
);

export const getError = createSelector(
  getUserFeatureState,
  (state) => state.error
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
