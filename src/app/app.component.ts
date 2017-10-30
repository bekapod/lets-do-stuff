import { Observable } from 'rxjs/Observable';
import { StatusBar } from '@ionic-native/status-bar';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Loading, LoadingController, Platform, Toast, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as messageActions from './actions/messages';
import * as todoActions from './todos/actions';
import * as fromMessages from './reducers/messages';
import * as fromLoading from './reducers/loading';

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent implements OnInit {
  rootPage: any = 'TodoListPage';
  loader: Loading = null;
  private errors$: Observable<any>;
  private successes$: Observable<any>;
  private loading$: Observable<any>;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
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

    this.loading$ = this.store.select(fromLoading.getIsLoading);
    this.loading$.subscribe(this.toggleLoadingIndicator.bind(this));
  }

  ngOnInit() {
    this.store.dispatch(new todoActions.FetchTodos());
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

  createLoader(): Loading {
    return this.loadingCtrl.create();
  }

  toggleLoadingIndicator(show: fromLoading.Loading) {
    if (show) {
      this.loader = this.createLoader();
      this.presentLoadingIndicator(this.loader);
      return;
    }

    if (this.loader !== null) {
      this.dismissLoadingIndicator(this.loader);
      this.loader = null;
    }
  }

  presentLoadingIndicator(loader: Loading) {
    loader.present();
  }

  dismissLoadingIndicator(loader: Loading) {
    loader.dismiss();
  }
}

