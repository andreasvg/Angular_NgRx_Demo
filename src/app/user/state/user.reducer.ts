import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes, UserActions} from './user.actions';

// Define the interface for user state:
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

// Define the initial state:
const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

// Start selector definitions
const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);
// End selector definitions

export function reducer(state: UserState = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.ToggleMaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
