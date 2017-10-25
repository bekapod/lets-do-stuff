
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyAppComponent } from './app.component';
import { TodoListPage } from '../pages/todo-list/todo-list';
import * as fromRoot from './reducers';
import * as fromMessages from './reducers/messages';
import { PlatformMock, SplashScreenMock, StatusBarMock, ToastControllerMock } from '../test-config/mocks-ionic';

describe('MyAppComponent', () => {
  let fixture: ComponentFixture<MyAppComponent>;
  let instance: MyAppComponent;
  let store: Store<fromRoot.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
      declarations: [
        MyAppComponent,
      ],
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
        }),
      ],
      providers: [
        { provide: Platform, useClass: PlatformMock },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: ToastController, useClass: ToastControllerMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();

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

  it('should get success messages when initialised', () => {
    expect(store.select).toBeCalledWith(fromMessages.getSuccesses);
  });

  it('should get error messages when initialised', () => {
    expect(store.select).toBeCalledWith(fromMessages.getErrors);
  });

  describe('showSuccesses', () => {
    it('should present a success toast', () => {
      const message = 'This is a success message.';
      spyOn(instance, 'presentToast');
      instance.showSuccesses([message]);

      expect(instance.presentToast).toBeCalledWith([message], 'success');
    });
  });

  describe('showErrors', () => {
    it('should present an error toast', () => {
      const message = 'This is an error message.';
      spyOn(instance, 'presentToast');
      instance.showErrors([message]);

      expect(instance.presentToast).toBeCalledWith([message], 'error');
    });
  });

  describe('presentToast', () => {
    it('should return a toast if messages is not empty', () => {
      spyOn(instance.toastCtrl, 'create').and.callThrough();
      const message = 'This is a success message.';
      instance.presentToast([message], 'error');

      expect(instance.toastCtrl.create).toBeCalledWith({
        message,
        duration: 3000,
        dismissOnPageChange: true,
        cssClass: 'app-toast-error',
      });
    });

    it('should return false if messages is empty', () => {
      spyOn(instance.toastCtrl, 'create').and.callThrough();
      instance.presentToast([], 'error');

      expect(instance.toastCtrl.create).not.toBeCalled();
    });
  });
});
