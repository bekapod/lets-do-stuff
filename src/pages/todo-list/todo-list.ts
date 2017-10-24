import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as fromTodos from '../../app/todos/reducers';
import * as actions from '../../app/todos/actions';
import { Todo } from '../../app/todos/models';

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage implements OnInit {

  isAddingTodo: boolean = false;
  todos: Todo[];
  private todos$: Observable<Todo[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromTodos.State>,
  ) {
    this.todos$ = this.store.select(fromTodos.getTodosSortedByCreated);

    this.todos$.subscribe(value => {
      this.todos = value;
    });
  }

  ngOnInit() {
    this.store.dispatch(new actions.FetchTodos());
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  addTodo(todo: Todo) {
    this.store.dispatch(new actions.AddTodo(todo));
    this.isAddingTodo = false;
  }

}
