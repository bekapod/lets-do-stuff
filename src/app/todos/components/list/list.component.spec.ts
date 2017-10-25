
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';
import { Todo } from '../../models';

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
      { title: 'Item 1', complete: false, created: '' },
      { title: 'Item 2', complete: false, created: '' },
      { title: 'Item 3', complete: false, created: '' },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    expect(items.length).toBe(3);
  });

  it('should render the todo item\'s title inside an ion-label', () => {
    const todos: Todo[] = [
      { title: 'Item 1', complete: false, created: '' },
      { title: 'Item 2', complete: false, created: '' },
      { title: 'Item 3', complete: false, created: '' },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const firstItem = items[0];
    const labelEl = firstItem.query(By.css('ion-label')).nativeElement;
    expect(labelEl.textContent).toEqual(todos[0].title);
  });

  it('should set checked to false on uncompleted todo items', () => {
    const todos: Todo[] = [
      { title: 'Item 1', complete: false, created: '' },
      { title: 'Item 2', complete: true, created: '' },
      { title: 'Item 3', complete: false, created: '' },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const uncompletedCheckbox = items[0].query(By.css('ion-checkbox'));
    expect(uncompletedCheckbox.properties['checked']).toBe(false);
  });

  it('should set checked to true on the completed todo items', () => {
    const todos: Todo[] = [
      { title: 'Item 1', complete: false, created: '' },
      { title: 'Item 2', complete: true, created: '' },
      { title: 'Item 3', complete: false, created: '' },
    ];
    instance.todos = todos;
    fixture.detectChanges();

    const items = fixture.debugElement.query(By.css('ion-list')).children;
    const completedCheckbox = items[1].query(By.css('ion-checkbox'));
    expect(completedCheckbox.properties['checked']).toBe(true);
  });
});
