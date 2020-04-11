import { ReducersMapObject, combineReducers } from 'redux';

import commonReducer, { IState as CommonState } from './common';

export interface AppState {
  common: CommonState;
}

export const configReducer = (partialReducers: ReducersMapObject = {}) =>
  combineReducers({
    common: commonReducer,
    ...partialReducers,
  });
