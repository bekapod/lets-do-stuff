import 'rxjs/add/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Platform, Toast, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoListPage } from '../pages/todo-list/todo-list';
import * as messageActions from './actions/messages';
import * as fromMessages from './reducers/messages';

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  rootPage: any = TodoListPage;
  private errors$: Observable<any>;
  private successes$: Observable<any>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    private store: Store<fromMessages.State>,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.successes$ = this.store.select(fromMessages.getSuccesses);
    this.successes$.debounceTime(500).subscribe(this.showSuccesses.bind(this));

    this.errors$ = this.store.select(fromMessages.getErrors);
    this.errors$.debounceTime(500).subscribe(this.showErrors.bind(this));
  }

  presentToast(messages: fromMessages.Messages, messageType: string, removeMessageAction): Toast {
    if (!messages.length) return null;

    const message = messages.join('\n');
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      dismissOnPageChange: true,
      cssClass: `app-toast-${messageType}`,
    });

    toast.onDidDismiss(() => {
      this.store.dispatch(removeMessageAction);
    });

    toast.present();

    return toast;
  }

  showSuccesses(messages: fromMessages.Messages) {
    this.presentToast(messages, 'success', new messageActions.DeleteSuccess(messages));
  }

  showErrors(messages: fromMessages.Messages) {
    this.presentToast(messages, 'error', new messageActions.DeleteError(messages));
  }
}

