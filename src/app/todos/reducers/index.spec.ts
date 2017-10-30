import * as fromTodos from './index';
import * as actions from '../actions';
import { Todo, TodoList } from '../models/';

describe('Todos Reducer', () => {
  const initialState: fromTodos.State = {
    items: {},
  };

  it('should not affect state when FETCH_TODOS is dispatched', () => {
    const action = new actions.FetchTodos();

    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should replace items with newly fetched items when FETCH_TODOS_SUCCEEDED is dispatched', () => {
    const payload: TodoList = {
      1: { id: '1', title: 'Item 1', complete: false, created: 'now' },
      2: { id: '2', title: 'Item 2', complete: false, created: 'now' },
      3: { id: '3', title: 'Item 3', complete: false, created: 'now' },
    };

    const action = new actions.FetchTodosSucceeded(payload);

    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
      items: payload,
    });
  });

  it('should not affect state when ADD_TODO is dispatched', () => {
    const payload: Todo = {
      id: null,
      title: 'New todo',
      complete: false,
      created: 'now',
    };
    const action = new actions.AddTodo(payload);
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when ADD_TODO_SUCCEEDED is dispatched', () => {
    const action = new actions.AddTodoSucceeded();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  describe('mapToArray', () => {
    it('should convert a TodoList into an array of Todo\'s', () => {
      const todoList: TodoList = {
        '1': { id: '1', title: 'Item 1', complete: false, created: '' },
        '2': { id: '2', title: 'Item 2', complete: false, created: '' },
        '3': { id: '3', title: 'Item 3', complete: false, created: '' },
      };

      expect(fromTodos.mapToArray(todoList)).toEqual([
        todoList['1'],
        todoList['2'],
        todoList['3'],
      ]);
    });

    it('should return an empty array if TodoList is empty', () => {
      const todoList: TodoList = {};
      expect(fromTodos.mapToArray(todoList)).toEqual([]);
    });
  });

  describe('sortByCreated', () => {
    it('should sort an array of Todo\'s by created date', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Item 1', complete: false, created: '1508938705101' },
        { id: '2', title: 'Item 2', complete: false, created: '1508938682679' },
        { id: '3', title: 'Item 3', complete: false, created: '1508938695272' },
      ];

      expect(fromTodos.sortByCreated(todos)).toEqual([
        todos[1],
        todos[2],
        todos[0],
      ]);
    });
  });
});
