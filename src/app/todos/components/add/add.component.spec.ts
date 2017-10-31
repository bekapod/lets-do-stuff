
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddComponent } from './add.component';
import { Todo } from '../../models';

describe('AddComponent', () => {
  let fixture: ComponentFixture<AddComponent>;
  let instance: AddComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [
        AddComponent,
      ],
      providers: [
        FormBuilder,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the add component', () => {
    expect(instance).toBeTruthy();
  });

  it('should contain an input for todo title', () => {
    const input = fixture.debugElement.query(By.css('ion-input[formControlName="title"]'));
    expect(input).toBeTruthy();
  });

  it('should contain a submit button that is disabled by default', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(button).toBeTruthy();
    expect(button.properties['disabled']).toBe(true);
  });

  it('should enable the submit button when todo input is not empty', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    instance.todo.controls['title'].setValue('Todo item');
    fixture.detectChanges();
    expect(button.properties['disabled']).toBe(false);
  });

  it('should disable the button again one todo input has been cleared', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]'));

    instance.todo.controls['title'].setValue('Todo item');
    fixture.detectChanges();
    expect(button.properties['disabled']).toBe(false);

    instance.todo.controls['title'].setValue('');
    fixture.detectChanges();
    expect(button.properties['disabled']).toBe(true);
  });

  it('should emit an onTodoSubmitted event and reset the form once form is submitted', () => {
    const emitSpy = spyOn(instance.onTodoSubmitted, 'emit');
    const resetSpy = spyOn(instance.todo, 'reset');
    const form = fixture.debugElement.query(By.css('form'));
    const todo: Todo = {
      id: null,
      title: 'Todo item',
      complete: false,
      created: 'MOCKED_DATE',
    };
    global.Date.now = jest.fn(() => todo.created);

    instance.todo.controls['title'].setValue(todo.title);
    fixture.detectChanges();
    form.triggerEventHandler('ngSubmit', null);

    expect(emitSpy).toBeCalledWith(todo);
    expect(resetSpy).toBeCalled();
  });
});
