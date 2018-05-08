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

    case AuthActionTypes.SIGNIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Email et/ou mot de passe invalide'
      };
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        // tslint:disable-next-line:max-line-length
        errorMessage: `Erreur à la création. Si vous avez déjà un compte merci d'utiliser la page de login ou la procédure de mot de passe oublié`
      };
    }

    default: {
      return state;
    }
  }
}
