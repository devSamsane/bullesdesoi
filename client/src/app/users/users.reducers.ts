import { User } from '../models/user';
import { Actions, ActionTypes } from './users.actions';

export interface State {

  // User authentifié: boolean
  authenticated: boolean;

  // Message d'erreur
  error?: string;

  // session existante: boolean
  loaded: boolean;

  // chargement en cours: boolean
  loading: boolean;

  // User authentifié
  user?: User;
}

const initialState: State = {
  authenticated: false,
  loaded: false,
  loading: false
};

/**
 * Reducer fonction
 * @export
 * @param {*} [state=initialState]
 * @param {Actions} action
 * @returns {State}
 */
export function reducer(state: any = initialState, action: Actions): State {

  switch (action.type) {
    case ActionTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        loading: true
      });

  case ActionTypes.AUTHENTICATED_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loaded: true
      });

    case ActionTypes.AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        authenticated: action.payload.authenticated,
        loaded: true,
        user: action.payload.user
      });

    case ActionTypes.AUTHENTICATE_ERROR:
    case ActionTypes.SIGN_UP_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loading: false
      });

    case ActionTypes.AUTHENTICATE_SUCCESS:
    case ActionTypes.SIGN_UP_SUCCESS:
      const user: User = action.payload.user;

      // verify user is not null
      if (user === null) {
        return state;
      }

      return Object.assign({}, state, {
        authenticated: true,
        error: undefined,
        loading: false,
        user: user
      });

    case ActionTypes.SIGN_OUT_ERROR:
      return Object.assign({}, state, {
        authenticated: true,
        error: action.payload.error.message,
        user: undefined
      });

    case ActionTypes.SIGN_OUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
        error: undefined,
        user: undefined
      });

    case ActionTypes.SIGN_UP:
      return Object.assign({}, state, {
        authenticated: false,
        error: undefined,
        loading: true
      });

    default:
      return state;
  }
}

/**
 * Renvoi `true` si le user est authentifié
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticated = (state: State) => state.authenticated;

/**
 * Renvoi `true` si le l'authentification est chargée
 * @param {State} state
 * @returns {boolean}
 */
export const isAuthenticatedLoaded = (state: State) => state.loaded;

/**
 * Renvoi le user state
 * @function getAuthenticatedUser
 * @param {State} state
 * @returns {User}
 */
export const getAuthenticatedUser = (state: State) => state.user;
