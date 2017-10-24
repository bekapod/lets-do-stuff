
import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { NavController, NavParams } from 'ionic-angular';
import { TodoListPage } from './todo-list';
import * as fromRoot from '../../app/reducers';
import * as fromTodos from '../../app/todos/reducers';
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
        { provide: NavController, useValue: NavMock },
        { provide: NavParams, useValue: NavParamsMock },
        FormBuilder,
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

  it('should show a title', () => {
    const title: HTMLHeadingElement = fixture.debugElement.query(By.css('ion-title')).nativeElement;
    expect(title.textContent).toContain('Todo List');
  });
});
