import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosModule } from '../../app/todos/todos.module';
import { TodoItemPage } from './todo-item';

@NgModule({
  declarations: [
    TodoItemPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoItemPage),
    TodosModule,
  ],
})
export class TodoItemPageModule {}
