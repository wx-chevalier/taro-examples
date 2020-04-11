import { createActions, handleActions } from 'redux-actions';
import { handle } from 'redux-middleware-pack-fsa';

export interface IState {
  count: number;
}

const initialState: IState = {
  count: 0,
};

export const actions = createActions({
  async incAsync(delta) {
    return delta;
  },
  async descAsync(delta) {
    return delta;
  },
});

export const commonActions = actions as any;

export default handleActions<IState, any>(
  {
    [actions.incAsync.toString()](state: IState, action) {
      return handle(state, action, {
        success: (prevState: IState) => ({
          ...prevState,
          count: state.count + action.payload,
        }),
      });
    },
    [actions.descAsync.toString()](state: IState, action) {
      return handle(state, action, {
        success: (prevState: IState) => ({
          ...prevState,
          count: state.count - action.payload,
        }),
      });
    },
  },
  initialState,
);
