import * as messages from '../actions/messages';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type Messages = any[];

export interface State {
  success: Messages;
  error: Messages;
}

export const initialState = {
  success: [],
  error: [],
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case messages.ADD_SUCCESS: {
      return {
        ...state,
        success: [
          ...state.success,
          action.payload,
        ]
      };
    }

    case messages.ADD_ERROR: {
      return {
        ...state,
        error: [
          ...state.error,
          action.payload,
        ]
      };
    }

    default:
      return state;
  }
}

export const getMessagesState = createFeatureSelector<State>('messages');

export const getSuccesses = createSelector(
  getMessagesState,
  (state: State) => state.success,
);

export const getErrors = createSelector(
  getMessagesState,
  (state: State) => state.error,
);
