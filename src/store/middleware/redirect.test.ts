import {MockStore, configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from '@reduxjs/toolkit';
import {AppRoute} from '../../const';
import {State} from '../../types/state';
import browserHistory from '../../browser-history';
import {redirect} from './redirect';
import {redirectToRouteAction} from '../action';

vi.mock('../../browser-history', () => ({
  default: {
    location: {pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect Middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);

    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to /login with redirectToRoute action', () => {
    const redirectAction = redirectToRouteAction(AppRoute.Login);

    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to / with empty action', () => {
    const emptyAction = {type: '', payload: AppRoute.Main};

    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
