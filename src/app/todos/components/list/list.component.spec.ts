
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';
import { Todo } from '../../models';
import { ReorderIndexes } from '../../../../test-config/mocks-ionic';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListComponent>;
  let instance: ListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [
        ListComponent,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the add component', () => {
    expect(instance).toBeTruthy();
  });

  it('should not render any ion-item\'s when no todos are passed', () => {
    const items = fixture.debugElement.query(By.css('ion-list')).children;
    expect(items.length).toBe(0);
  });

  it('should render 3 ion-item\'s when 3 todos are passed', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    expect(items.length).toBe(3);
  });

  it('should render the todo item\'s title inside an ion-label', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const firstItem = items[0];
    const labelEl = firstItem.query(By.css('ion-label .Todo-title')).nativeElement;
    expect(labelEl.textContent).toEqual(todos[0].title);
  });

  it('should render the todo item\'s description inside an ion-label', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', description: 'Description of todo item', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const firstItem = items[0];
    const labelEl = firstItem.query(By.css('ion-label .Todo-description')).nativeElement;
    expect(labelEl.textContent).toEqual(todos[0].description);
  });

  it('should set checked to false on uncompleted todo items', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: true, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const uncompletedCheckbox = items[0].query(By.css('ion-checkbox'));
    expect(uncompletedCheckbox.properties['checked']).toBe(false);
  });

  it('should set checked to true on the completed todo items', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: true, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const completedCheckbox = items[1].query(By.css('ion-checkbox'));
    expect(completedCheckbox.properties['checked']).toBe(true);
  });

  it('should should emit an onTodoEditClicked event with the todo when edit button is clicked', () => {
    spyOn(instance.onTodoEditClicked, 'emit').and.callThrough();

    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-item-sliding:nth-child(2) ion-item-options[side="right"] button.Todo-edit'));
    button.triggerEventHandler('click', null);
    expect(instance.onTodoEditClicked.emit).toBeCalledWith(todos[1]);
  });

  it('should emit an onTodoEdited event with correct complete state when checkbox value is changed', () => {
    spyOn(instance.onTodoEdited, 'emit').and.callThrough();
    spyOn(instance, 'setComplete').and.callThrough();

    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('ion-item-sliding:first-child ion-checkbox'));
    checkbox.triggerEventHandler('ionChange', { checked: true });

    expect(instance.setComplete).toHaveBeenCalledWith({ checked: true }, todos[0]);
    expect(instance.onTodoEdited.emit).toHaveBeenCalledWith({
      ...todos[0],
      complete: true,
    });
  });

  it('should emit an onTodoDeleted event when delete button is clicked', () => {
    spyOn(instance.onTodoDeleted, 'emit').and.callThrough();

    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-item-sliding:nth-child(2) ion-item-options[side="right"] button.Todo-delete'));
    button.triggerEventHandler('click', null);
    expect(instance.onTodoDeleted.emit).toBeCalledWith(todos[1]);
  });

  it('should emit an onTodosReordered event when todos are re-ordered', () => {
    spyOn(instance.onTodosReordered, 'emit').and.callThrough();

    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', order: 3 },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    instance.reorderTodos(new ReorderIndexes(1, 0));
    expect(instance.onTodosReordered.emit).toHaveBeenCalledWith([
      { ...todos[1], order: 0 },
      { ...todos[0], order: 1 },
      { ...todos[2], order: 2 },
    ]);
  });

  describe('getDueDateClass', () => {
    const todos: Todo[] = [
      { id: '1', title: 'Item 1', complete: false, created: '', dueDate: '2017-12-25', order: 1 },
      { id: '2', title: 'Item 2', complete: false, created: '', dueDate: '2017-12-26', order: 2 },
      { id: '3', title: 'Item 3', complete: false, created: '', dueDate: '2017-12-27', order: 3 },
      { id: '4', title: 'Item 4', complete: false, created: '', order: 4 },
    ];
    let oldDateNow;

    beforeAll(() => {
      oldDateNow = global.Date.now;
      global.Date.now = jest.fn(() => todos[0].dueDate);
    });

    afterAll(() => {
      global.Date.now = oldDateNow;
    });

    it('should not return any class by default', () => {
      expect(instance.getDueDateClass(todos[2])).toEqual('');
    });

    it('should not return any class if due date is not set', () => {
      expect(instance.getDueDateClass(todos[3])).toEqual('');
    });

    it('should return "is-due" if todo is due today', () => {
      expect(instance.getDueDateClass(todos[0])).toEqual('is-due');
    });

    it('should return "is-nearly-due" if todo is due tomorrow', () => {
      expect(instance.getDueDateClass(todos[1])).toEqual('is-nearly-due');
    });
  });
});
