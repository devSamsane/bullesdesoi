import { User } from '../../models/user.model';
import { All, AuthActionTypes } from '../actions/auth.actions';

// State initial
export const initialState: State = {
  isAuthenticated: false,
  user: undefined,
  errorMessage: null
};

export interface State {

  // le user est-il authentifié
  isAuthenticated: boolean;

  // Si il est authentifié alors l'object user n'est pas null
  user: User | undefined;

  // Message d'erreur
  errorMessage: string | null;
}

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    default: {
      return state;
    }
  }
}
