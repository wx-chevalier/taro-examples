/* eslint-disable @typescript-eslint/no-require-imports */
import {
  applyMiddleware,
  compose,
  createStore,
  ReducersMapObject,
} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-middleware-pack-fsa';

import { configReducer } from '../ducks';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [reduxPackMiddleware, thunkMiddleware];

if (
  process.env.NODE_ENV === 'development' &&
  process.env.TARO_ENV !== 'quickapp'
) {
  middlewares.push(createLogger());
}

const enhancers = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

export function configStore(initialState: object = {}) {
  const store = createStore(configReducer({}), initialState, enhancers);

  function appendReducer(asyncReducers: ReducersMapObject) {
    store.replaceReducer(configReducer(asyncReducers));
  }

  return {
    ...store,
    appendReducer,
  };
}

export const defaultStore = configStore();
