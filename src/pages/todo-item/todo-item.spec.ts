
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { NavController, NavParams } from 'ionic-angular';
import { TodoItemPage } from './todo-item';
import * as fromRoot from '../../app/reducers';
import * as fromTodos from '../../app/todos/reducers';
import * as actions from '../../app/todos/actions';
import { Todo, TodoList } from '../../app/todos/models';
import { NavMock, NavParamsMock } from '../../test-config/mocks-ionic';

describe('TodoItemPage', () => {
  let fixture: ComponentFixture<TodoItemPage>;
  let instance: TodoItemPage;
  let store: Store<fromTodos.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
        StoreModule.forFeature('todos', fromTodos.reducer)
      ],
      declarations: [
        TodoItemPage,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock },
        Actions,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoItemPage);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the todo list page', () => {
    expect(instance).toBeTruthy();
  });

  it('should show the todos-edit form', () => {
    const form = fixture.debugElement.query(By.css('todos-edit'));
    expect(form).toBeTruthy();
  });

  it('should set the current todo state to the id from navigation params', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new actions.SetCurrentTodo('default'));
  });

  it('should retrieve the current to do from state', () => {
    const todoList: TodoList = {
      'default': {
        id: 'default',
        title: 'Todo',
        created: 'now',
        complete: false,
      },
    };
    store.dispatch(new actions.FetchTodosSucceeded(todoList));
    store.dispatch(new actions.SetCurrentTodo('default'));
    expect(instance.todo).toEqual(todoList['default']);
  });

  it('should destroy the todo subscription once a valid todo has been retrieved', () => {
    store.dispatch(new actions.FetchTodosSucceeded({}));
    store.dispatch(new actions.SetCurrentTodo(undefined));
    expect(instance.todo).toBe(undefined);

    store.dispatch(new actions.FetchTodosSucceeded({
      'default': {
        id: 'default',
        title: 'Todo',
        created: 'now',
        complete: false,
      },
    }));
    store.dispatch(new actions.SetCurrentTodo('default'));
    expect(instance.todo.title).toBe('Todo');

    store.dispatch(new actions.FetchTodosSucceeded({
      'default': {
        id: 'default',
        title: 'Another todo',
        created: 'now',
        complete: false,
      },
    }));
    store.dispatch(new actions.SetCurrentTodo('default'));
    expect(instance.todo.title).toBe('Todo');
  });

  it('should redirect to TodoListPage once todo has been saved', () => {
    spyOn(instance.navCtrl, 'push');
    store.dispatch(new actions.SaveTodoSucceeded());
    expect(instance.navCtrl.push).toHaveBeenCalledWith('TodoListPage');
  });

  it('should dispatch a SAVE_TODO action when an edited todo has been received', () => {
    const todo = {
      id: '1',
      title: 'Edited todo',
      created: 'now',
      complete: false,
    };
    instance.editTodo(todo);
    expect(store.dispatch).toHaveBeenCalledWith(new actions.SaveTodo(todo));
  });
});
