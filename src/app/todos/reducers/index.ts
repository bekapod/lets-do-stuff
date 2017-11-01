import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pathOr } from 'ramda';
import { Todo, TodoList } from '../models';
import * as todos from '../actions';

export interface State {
  items: TodoList;
  currentItem: string;
}

export const initialState: State = {
  items: {},
  currentItem: null,
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case todos.FETCH_TODOS:
    case todos.ADD_TODO:
    case todos.ADD_TODO_SUCCEEDED:
    case todos.ADD_TODO_FAILED:
    case todos.SAVE_TODO:
    case todos.SAVE_TODO_SUCCEEDED:
    case todos.SAVE_TODO_FAILED:
    case todos.SAVE_ALL_TODOS:
    case todos.SAVE_ALL_TODOS_SUCCEEDED:
    case todos.SAVE_ALL_TODOS_FAILED:
    case todos.DELETE_TODO:
    case todos.DELETE_TODO_SUCCEEDED:
    case todos.DELETE_TODO_FAILED: {
      return {
        ...state,
      };
    }

    case todos.FETCH_TODOS_SUCCEEDED: {
      return {
        ...state,
        items: action.payload || initialState.items,
      };
    }

    case todos.SET_CURRENT_TODO: {
      return {
        ...state,
        currentItem: action.payload,
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

export const getCurrentTodo = createSelector(
  getTodosState,
  (state: State) => getTodoById(state, state.currentItem),
);

export const getTodoById = (state: State, id: string) => state.items[id];

export const mapToArray = (items: TodoList) => (
  pathOr(false, ['length'], Object.keys(items))
    ? Object.keys(items).map(id => ({ ...items[id], id }))
    : []
);

export const sortByCreated = (todos: Todo[]) => (
  [...todos].sort((a, b) => parseInt(a.created, 10) - parseInt(b.created, 10))
);

export const sortByOrder = (todos: Todo[]) => (
  [...todos].sort((a, b) => a.order - b.order)
);

export const getTodosAsArray = createSelector(
  getTodos,
  (items: TodoList) => mapToArray(items),
);

export const getTodosSortedByCreated = createSelector(
  getTodosAsArray,
  (todos: Todo[]) => sortByCreated(todos),
);

export const getTodosSortedByOrder = createSelector(
  getTodosAsArray,
  (todos: Todo[]) => sortByOrder(todos),
);

