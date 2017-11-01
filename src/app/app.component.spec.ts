
import { MyAppComponent } from './app.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Loading, LoadingController, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromRoot from './reducers';
import * as fromMessages from './reducers/messages';
import * as messageActions from './actions/messages';
import * as todoActions from './todos/actions';
import {
  LoadingControllerMock,
  PlatformMock,
  SplashScreenMock,
  StatusBarMock,
  ToastControllerMock,
} from '../test-config/mocks-ionic';

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
        { provide: LoadingController, useClass: LoadingControllerMock },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'select').and.callThrough();
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(MyAppComponent);
    instance = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(instance).toBeTruthy();
  });

  it('should render the Todo List page', () => {
    expect(instance.rootPage).toBe('TodoListPage');
  });

  it('should fetch todos when initialised', () => {
    expect(store.dispatch).toBeCalledWith(new todoActions.FetchTodos());
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

      expect(instance.presentToast).toBeCalledWith([message], 'success', new messageActions.DeleteSuccess([message]));
    });
  });

  describe('showErrors', () => {
    it('should present an error toast', () => {
      const message = 'This is an error message.';
      spyOn(instance, 'presentToast');
      instance.showErrors([message]);

      expect(instance.presentToast).toBeCalledWith([message], 'error', new messageActions.DeleteError([message]));
    });
  });

  describe('presentToast', () => {
    it('should return a toast if messages is not empty', () => {
      spyOn(instance.toastCtrl, 'create').and.callThrough();
      const message = 'This is an error message.';
      instance.presentToast([message], 'error', new messageActions.DeleteError([message]));

      expect(instance.toastCtrl.create).toBeCalledWith({
        message,
        duration: 3000,
        dismissOnPageChange: false,
        cssClass: 'app-toast-error',
      });
    });

    it('should return false if messages is empty', () => {
      spyOn(instance.toastCtrl, 'create').and.callThrough();
      instance.presentToast([], 'error', new messageActions.DeleteError([]));

      expect(instance.toastCtrl.create).not.toBeCalled();
    });

    it('should dispatch an action to remove the message once toast has been dismissed', () => {
      const message = 'This is a success message.';
      const action = new messageActions.DeleteSuccess([message]);
      const toast = instance.presentToast([message], 'error', action);
      toast.dismiss();

      expect(store.dispatch).toBeCalledWith(action);
    });
  });

  describe('createLoader', () => {
    it('should create a loader', () => {
      spyOn(instance.loadingCtrl, 'create');
      instance.createLoader();
      expect(instance.loadingCtrl.create).toHaveBeenCalled();
    });
  });

  describe('toggleLoadingIndicator', () => {
    it('should create a loader and present it when show is true', () => {
      spyOn(instance.loadingCtrl, 'create').and.callThrough();
      spyOn(instance, 'presentLoadingIndicator');

      instance.toggleLoadingIndicator(true);

      expect(instance.loadingCtrl.create).toHaveBeenCalled();
      expect(instance.presentLoadingIndicator).toHaveBeenCalled();
    });

    it('should call present on the loader when presented', () => {
      const loader: Loading = instance.loadingCtrl.create();
      spyOn(loader, 'present');

      instance.presentLoadingIndicator(loader);
      expect(loader.present).toHaveBeenCalled();
    });

    it('should dismiss the existing loader when show is false', () => {
      spyOn(instance, 'dismissLoadingIndicator');

      instance.loader = instance.loadingCtrl.create();
      instance.toggleLoadingIndicator(false);

      expect(instance.dismissLoadingIndicator).toHaveBeenCalled();
    });

    it('should call dismiss on the loader when dismissed', () => {
      const loader: Loading = instance.loadingCtrl.create();
      spyOn(loader, 'dismiss');

      instance.dismissLoadingIndicator(loader);
      expect(loader.dismiss).toHaveBeenCalled();
    });
  });
});
