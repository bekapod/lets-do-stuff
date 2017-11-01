import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseProps } from '../environment';
import { metaReducers, reducers } from './reducers';

import { MyAppComponent } from './app.component';
import { TodoListPageModule } from '../pages/todo-list/todo-list.module';
import { TodoItemPageModule } from '../pages/todo-item/todo-item.module';

export const firebaseConfig = {
  ...firebaseProps
};

@NgModule({
  declarations: [
    MyAppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    IonicModule.forRoot(MyAppComponent),
    TodoListPageModule,
    TodoItemPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
