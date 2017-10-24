import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as fromTodos from '../../app/todos/reducers';
import { Todo } from '../../app/todos/models';

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {

  isAddingTodo: boolean = false;
  todo: FormGroup;
  todos: Todo[];
  private todos$: Observable<Todo[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private store: Store<fromTodos.State>,
  ) {
    this.todos$ = this.store.select(fromTodos.getTodos);
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
    });

    this.todos$.subscribe(value => {
      this.todos = value;
    });
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

}
