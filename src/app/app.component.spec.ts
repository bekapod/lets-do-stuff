
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyAppComponent } from './app.component';
import { TodoListPage } from '../pages/todo-list/todo-list';
import { PlatformMock, SplashScreenMock, StatusBarMock } from '../test-config/mocks-ionic';

describe('MyAppComponent', () => {
  let fixture: ComponentFixture<MyAppComponent>;
  let instance: MyAppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [
        MyAppComponent,
      ],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppComponent);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(instance).toBeTruthy();
  });

  it('should render the Todo List page', () => {
    expect(instance.rootPage).toBe(TodoListPage);
  });
});
