import { AUTH_STATUS } from '../../../constants';
import { userSlice } from './index.ts';
import { makeFakeAuthenticatedUser, makeFakeAuthenticationForm, makeFakeUserState } from '../../../utils/tests';
import { fetchUserByTokenAction, loginAction, logoutAction } from './thunk.ts';

describe('UserReducers', () => {
  it('should return initial state with empty action', () => {
    const state = makeFakeUserState({});
    const emptyAction = { type: '' };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(state);
  });

  it('should return initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState = {
      user: null,
      authorizationStatus: AUTH_STATUS.Unknown,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set user with "fetchUserByTokenAction.fulfilled"', () => {
    const state = makeFakeUserState({
      shouldCreateUser: false,
      authorizationStatus: AUTH_STATUS.Auth,
    });

    const userFromServer = makeFakeAuthenticatedUser();
    const { user, authorizationStatus } = userSlice.reducer(
      state,
      fetchUserByTokenAction.fulfilled(userFromServer, '', ''),
    );

    expect(user).toEqual(userFromServer);
    expect(authorizationStatus).toBe(AUTH_STATUS.Auth);
  });

  it('should clear user with "fetchUserByTokenAction.rejected"', () => {
    const state = makeFakeUserState({
      shouldCreateUser: true,
      authorizationStatus: AUTH_STATUS.Auth,
    });

    const { user, authorizationStatus } = userSlice.reducer(
      state,
      fetchUserByTokenAction.rejected(new Error(), '', ''),
    );

    expect(user).toEqual(null);
    expect(authorizationStatus).toBe(AUTH_STATUS.NoAuth);
  });

  it('should set user with "loginAction.fulfilled"', () => {
    const state = makeFakeUserState({
      shouldCreateUser: false,
      authorizationStatus: AUTH_STATUS.Unknown,
    });

    const userFromServer = makeFakeAuthenticatedUser();
    const authenticationForm = makeFakeAuthenticationForm();

    const { user, authorizationStatus } = userSlice.reducer(
      state,
      loginAction.fulfilled(userFromServer, '', authenticationForm),
    );

    expect(user).toBe(userFromServer);
    expect(authorizationStatus).toBe(AUTH_STATUS.Auth);
  });

  it('should clear user with "loginAction.rejected"', () => {
    const state = makeFakeUserState({
      shouldCreateUser: false,
      authorizationStatus: AUTH_STATUS.Unknown,
    });

    const authenticationForm = makeFakeAuthenticationForm();

    const { user, authorizationStatus } = userSlice.reducer(
      state,
      loginAction.rejected(new Error(), '', authenticationForm),
    );

    expect(user).toBe(null);
    expect(authorizationStatus).toBe(AUTH_STATUS.NoAuth);
  });

  it('should clear user with "logoutAction.fulfilled"', () => {
    const state = makeFakeUserState({
      shouldCreateUser: true,
      authorizationStatus: AUTH_STATUS.Auth,
    });

    const { user, authorizationStatus } = userSlice.reducer(
      state,
      logoutAction.fulfilled(undefined, '', ''),
    );

    expect(user).toBe(null);
    expect(authorizationStatus).toBe(AUTH_STATUS.NoAuth);
  });
});
