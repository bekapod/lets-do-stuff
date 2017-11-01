import * as fromTodos from './index';
import * as actions from '../actions';
import { Todo, TodoList } from '../models/';

describe('Todos Reducer', () => {
  const initialState: fromTodos.State = {
    items: {},
    currentItem: null,
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

  it('should retain the previous state if FETCH_TODOS_SUCCEEDED is dispatched with a falsy value', () => {
    const payload: TodoList = null;

    const action = new actions.FetchTodosSucceeded(payload);

    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when FETCH_TODOS_FAILED is dispatched', () => {
    const action = new actions.FetchTodosFailed();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
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

  it('should not affect state when ADD_TODO_FAILED is dispatched', () => {
    const action = new actions.AddTodoFailed();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when SAVE_TODO is dispatched', () => {
    const payload: Todo = {
      id: '1',
      title: 'New todo',
      complete: false,
      created: 'now',
    };
    const action = new actions.SaveTodo(payload);
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when SAVE_TODO_SUCCEEDED is dispatched', () => {
    const action = new actions.SaveTodoSucceeded();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when SAVE_TODO_FAILED is dispatched', () => {
    const action = new actions.SaveTodoFailed();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when DELETE_TODO is dispatched', () => {
    const payload: Todo = {
      id: '1',
      title: 'New todo',
      complete: false,
      created: 'now',
    };
    const action = new actions.DeleteTodo(payload);
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when DELETE_TODO_SUCCEEDED is dispatched', () => {
    const action = new actions.DeleteTodoSucceeded();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should not affect state when DELETE_TODO_FAILED is dispatched', () => {
    const action = new actions.DeleteTodoFailed();
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
    });
  });

  it('should add the id of the current item to state when SET_CURRENT_TODO is dispatched', () => {
    const action = new actions.SetCurrentTodo('item-id');
    expect(fromTodos.reducer(initialState, action)).toEqual(<fromTodos.State>{
      ...initialState,
      currentItem: 'item-id',
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

  describe('getTodoById', () => {
    it('should retrieve the correct todo by the id passed in', () => {
      const state: fromTodos.State = {
        items: {
          '1': { id: '1', title: 'Item 1', complete: false, created: '' },
          '2': { id: '2', title: 'Item 2', complete: false, created: '' },
          '3': { id: '3', title: 'Item 3', complete: false, created: '' },
        },
        currentItem: '2',
      };

      expect(fromTodos.getTodoById(state, '2')).toEqual(state.items['2']);
    });
  });
});
