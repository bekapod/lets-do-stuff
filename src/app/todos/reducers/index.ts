import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pathOr } from 'ramda';
import { Todo, TodoList } from '../models';
import * as todos from '../actions';

export interface State {
  items: TodoList;
  loading: boolean;
}

const initialState: State = {
  items: {},
  loading: false,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case todos.FETCH_TODOS: {
      return {
        ...state,
        loading: true,
      };
    }

    case todos.FETCH_TODOS_SUCCEEDED: {
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    }

    case todos.ADD_TODO: {
      return {
        ...state,
        loading: true,
      };
    }

    case todos.ADD_TODO_SUCCEEDED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
}

export const getTodosState = createFeatureSelector<State>('todos');

export const getTodos = createSelector(
  getTodosState,
  (state: State) => state.items
);

export const mapToArray = (items: TodoList) => (
  pathOr(false, ['length'], Object.keys(items)) ? Object.keys(items).map(id => items[id]) : []
);

export const sortByCreated = (todos: Todo[]) => (
  [...todos].sort((a, b) => parseInt(a.created, 10) - parseInt(b.created, 10))
);

export const getTodosAsArray = createSelector(
  getTodos,
  (items: TodoList) => mapToArray(items),
);

export const getTodosSortedByCreated = createSelector(
  getTodosAsArray,
  (todos: Todo[]) => sortByCreated(todos),
);

