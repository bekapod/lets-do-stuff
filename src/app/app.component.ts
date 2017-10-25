import 'rxjs/add/operator/debounceTime';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TodoListPage } from '../pages/todo-list/todo-list';
import * as fromMessages from './reducers/messages';
import { Observable } from 'rxjs/Observable';
import { Messages } from './reducers/messages';

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

    this.errors$ = this.store.select(fromMessages.getErrors);
    this.errors$.debounceTime(500).subscribe(this.showErrors.bind(this));

    this.successes$ = this.store.select(fromMessages.getSuccesses);
    this.successes$.subscribe(this.showSuccesses.bind(this));
  }

  presentToast(messages: Messages, messageType: string) {
    if (!messages.length) return;

    const message = messages.join('\n');
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      dismissOnPageChange: true,
      cssClass: `app-toast-${messageType}`,
    });

    toast.onDidDismiss(() => {
      console.log('toast gone');
    });

    toast.present();
  }

  showErrors(messages: Messages) {
    this.presentToast(messages, 'error');
  }

  showSuccesses(messages: Messages) {
    this.presentToast(messages, 'success');
  }
}

