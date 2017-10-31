
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { TodoListPage } from './todo-list';
import * as fromRoot from '../../app/reducers';
import * as fromTodos from '../../app/todos/reducers';
import * as actions from '../../app/todos/actions';
import { Todo, TodoList } from '../../app/todos/models';
import { NavMock, NavParamsMock } from '../../test-config/mocks-ionic';

describe('TodoListPage', () => {
  let fixture: ComponentFixture<TodoListPage>;
  let instance: TodoListPage;
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
        TodoListPage,
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoListPage);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the todo list page', () => {
    expect(instance).toBeTruthy();
  });

  it('should have new todos sorted by date when todos have been fetched', () => {
    const todoList: TodoList = {
      '1': { id: '1', title: 'Todo 1', complete: false, created: '1508925020343' },
      '2': { id: '2', title: 'Todo 2', complete: false, created: '1508925045342' },
      '3': { id: '3', title: 'Todo 3', complete: false, created: '1508925037299' },
    };
    store.dispatch(new actions.FetchTodosSucceeded(todoList));
    fixture.detectChanges();
    expect(instance.todos).toEqual([todoList['1'], todoList['3'], todoList['2']]);
  });

  it('should show a title', () => {
    const titleEl = fixture.debugElement.query(By.css('ion-title')).nativeElement;
    expect(titleEl.textContent).toContain('Todo List');
  });

  it('should render a <todos-list>', () => {
    const list = fixture.debugElement.query(By.css('todos-list'));
    expect(list).toBeTruthy();
  });

  it('should render a button that enables user to add a new todo', () => {
    const button = fixture.debugElement.query(By.css('ion-fab button'));
    expect(button).toBeTruthy();
  });

  it('should toggle isAddingTodo when toggleAddToDo is called', () => {
    expect(instance.isAddingTodo).toBe(false);
    instance.toggleAddTodo();
    expect(instance.isAddingTodo).toBe(true);
    instance.toggleAddTodo();
    expect(instance.isAddingTodo).toBe(false);
  });

  it('should not render <todos-add> when isAddingTodo is false', () => {
    instance.isAddingTodo = false;
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('todos-add'));
    expect(list).toBeFalsy();
  });

  it('should render <todos-add> when isAddingTodo is true', () => {
    instance.isAddingTodo = true;
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('todos-add'));
    expect(list).toBeTruthy();
  });

  it('should dispatch an ADD_TODO action and hide form when <todos-add> has been submitted', () => {
    const newTodo: Todo = {
      id: null,
      title: 'New todo',
      created: 'Now',
      complete: false,
    };

    instance.isAddingTodo = true;
    fixture.detectChanges();

    const addTodo = fixture.debugElement.query(By.css('todos-add'));
    addTodo.triggerEventHandler('onTodoSubmitted', newTodo);

    expect(store.dispatch).toBeCalledWith(new actions.AddTodo(newTodo));
    expect(instance.isAddingTodo).toBe(false);
  });

  it('should redirect to the correct todo item page when goToTodo is called', () => {
    spyOn(instance.navCtrl, 'push');
    instance.goToTodo({
      id: '1',
      title: 'Todo item',
      created: 'now',
      complete: false,
    });
    expect(instance.navCtrl.push).toHaveBeenCalledWith('TodoItemPage', { id: '1' });
  });
});
