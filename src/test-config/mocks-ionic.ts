import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(): Function {
    return (() => true);
  }

  public hasFocus(): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout() {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {
  public pop(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function(resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(): void {
    return ;
  }

}

export class NavParamsMock {
  static returnParam = null;
  public get(): any {
    if (NavParamsMock.returnParam) {
       return NavParamsMock.returnParam;
    }
    return 'default';
  }

  static setParams(value) {
    NavParamsMock.returnParam = value;
  }
}

export class DeepLinkerMock {
}

export class ToastControllerMock {
  dismissCb = () => {};

  create() {
    return this;
  }

  present() {
    return true;
  }

  dismiss() {
    this.dismissCb();
  }

  onDidDismiss(cb) {
    this.dismissCb = cb;
  }
}

export class LoadingMock {
  present() {
    return true;
  }

  dismiss() {
    return true;
  }
}

export class LoadingControllerMock {
  create() {
    return new LoadingMock();
  }
}
