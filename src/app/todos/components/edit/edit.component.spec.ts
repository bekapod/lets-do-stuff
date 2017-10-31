
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EditComponent } from './edit.component';
import { Todo } from '../../models';

describe('AddComponent', () => {
  let fixture: ComponentFixture<EditComponent>;
  let instance: EditComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [
        EditComponent,
      ],
      providers: [
        FormBuilder,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the edit component', () => {
    expect(instance).toBeTruthy();
  });

  it('should contain an input for todo title', () => {
    const input = fixture.debugElement.query(By.css('ion-input[formControlName="title"]'));
    expect(input).toBeTruthy();
  });

  it('should contain an input for todo description', () => {
    const input = fixture.debugElement.query(By.css('ion-textarea[formControlName="description"]'));
    expect(input).toBeTruthy();
  });

  it('should contain a submit button that is enabled when form is valid', () => {
    const todo: Todo = {
      id: '1',
      title: 'This is a todo',
      description: 'Some description.',
      created: 'now',
      complete: false,
    };
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy();

    instance.ngOnChanges({
      todo: new SimpleChange(null, todo, true),
    });
    fixture.detectChanges();
    expect(button.properties['disabled']).toBe(false);
  });

  it('should contain a submit button that is disabled when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy();
    expect(button.properties['disabled']).toBe(true);
  });

  it('should update todo and edit form when a new todo is passed in', () => {
    const todo: Todo = {
      id: '1',
      title: 'This is a todo',
      description: 'Some description.',
      created: 'now',
      complete: false,
    };
    const newTodo: Todo = {
      id: '2',
      title: 'This is a new todo',
      description: 'Description of the new todo.',
      created: 'now',
      complete: true,
    };
    const form = instance.edit;

    instance.ngOnChanges({
      todo: new SimpleChange(null, todo, true),
    });
    fixture.detectChanges();
    expect(form.value).toEqual({
      title: todo.title,
      description: todo.description,
    });

    instance.ngOnChanges({
      todo: new SimpleChange(todo, newTodo, false),
    });
    fixture.detectChanges();
    expect(form.value).toEqual({
      title: newTodo.title,
      description: newTodo.description,
    });
  });

  it('should emit an onTodoEdited event once valid form is submitted', () => {
    const emitSpy = spyOn(instance.onTodoEdited, 'emit');
    const form = fixture.debugElement.query(By.css('form'));
    const todo: Todo = {
      id: '1',
      title: 'Todo item',
      description: 'Description of todo item.',
      complete: false,
      created: 'now',
    };

    instance.ngOnChanges({
      todo: new SimpleChange(null, todo, true),
    });
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);
    expect(emitSpy).toBeCalledWith(todo);
  });

  it('should not submit emit event if form is invalid', () => {
    const emitSpy = spyOn(instance.onTodoEdited, 'emit');
    const form = fixture.debugElement.query(By.css('form'));
    const todo: Todo = {
      id: '1',
      title: '',
      description: 'Description of todo item.',
      complete: false,
      created: 'now',
    };

    instance.ngOnChanges({
      todo: new SimpleChange(null, todo, true),
    });
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);
    expect(emitSpy).not.toBeCalled();
  });

  it('should emit an onTodoDeleted event when deleteTodo is called', () => {
    const emitSpy = spyOn(instance.onTodoDeleted, 'emit');
    const todo: Todo = {
      id: '1',
      title: 'Todo item',
      description: 'Description of todo item.',
      complete: false,
      created: 'now',
    };

    instance.ngOnChanges({
      todo: new SimpleChange(null, todo, true),
    });
    fixture.detectChanges();
    instance.deleteTodo();
    expect(emitSpy).toBeCalledWith(todo);
  });
});
