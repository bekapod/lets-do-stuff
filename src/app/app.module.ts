import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyAppComponent } from './app.component';
import { TodoListPageModule } from '../pages/todo-list/todo-list.module';

@NgModule({
  declarations: [
    MyAppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyAppComponent),
    TodoListPageModule,
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
