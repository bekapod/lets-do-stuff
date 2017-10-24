import * as fromTodos from './index';
import * as actions from '../actions';
import { TodoList } from '../models/';
import { createSelector } from '@ngrx/store';

describe('Todos Reducer', () => {
  const initialState: fromTodos.State = {
    items: {},
    loading: false,
    error: null,
  };

  it('should set loading to true when FETCH_TODOS is dispatched', () => {
    const action = new actions.FetchTodos();

    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
      loading: true,
    });
  });

  it('should replace items with newly fetched items when FETCH_TODOS_SUCCEEDED is dispatched', () => {
    const payload: TodoList = {
      1: { title: 'Item 1', complete: false, created: 'now' },
      2: { title: 'Item 2', complete: false, created: 'now' },
      3: { title: 'Item 3', complete: false, created: 'now' },
    };

    const action = new actions.FetchTodosSucceeded(payload);

    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
      items: payload,
      loading: false,
      error: null,
    });
  });

  it('should add error to the state when FETCH_TODOS_FAILED is dispatched', () => {
    const payload = 'An error occurred';
    const action = new actions.FetchTodosFailed(payload);
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
      error: payload,
    });
  });
});
