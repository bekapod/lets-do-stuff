import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodosModule } from '../../app/todos/todos.module';
import { TodoListPage } from './todo-list';

@NgModule({
  declarations: [
    TodoListPage,
  ],
  imports: [
    IonicPageModule.forChild(TodoListPage),
    TodosModule,
  ],
})
export class TodoListPageModule {}
