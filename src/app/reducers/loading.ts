import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as loading from '../actions/loading';

export type Loading = boolean;

export interface State {
  isLoading: Loading;
}

export const initialState = {
  isLoading: false,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case loading.SHOW: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case loading.HIDE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}

export const getLoadingState = createFeatureSelector<State>('loading');

export const getIsLoading = createSelector(
  getLoadingState,
  (state: State) => state.isLoading,
);
