import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromMessages from './messages';
import * as fromLoading from './loading';

export interface State {
  messages: fromMessages.State;
  loading: fromLoading.State;
}

export const initialState = {
  messages: fromMessages.initialState,
  loading: fromLoading.initialState,
};

export const reducers: ActionReducerMap<State> = {
  messages: fromMessages.reducer,
  loading: fromLoading.reducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger, storeFreeze];
