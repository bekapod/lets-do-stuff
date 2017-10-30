import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodoItemPage } from './todo-item';

@NgModule({
  declarations: [
    TodoItemPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoItemPage),
  ],
})
export class TodoItemPageModule {}
