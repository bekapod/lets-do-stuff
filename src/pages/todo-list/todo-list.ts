import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as fromTodos from '../../app/todos/reducers';
import * as actions from '../../app/todos/actions';
import { Todo } from '../../app/todos/models';
import { Subject } from 'rxjs/Subject';

@IonicPage({
  segment: 'list',
})
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {

  isAddingTodo: boolean = false;
  todos: Todo[];
  todos$: Observable<Todo[]>;
  destroy$: Subject<boolean> = new Subject();
  refreshComplete$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromTodos.State>,
    private action$: Actions,
  ) {
    this.todos$ = this.store.select(fromTodos.getTodosSortedByOrder);

    this.todos$.subscribe(value => {
      this.todos = value;
    });
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  addTodo(todo: Todo) {
    this.store.dispatch(new actions.AddTodo(todo));
    this.isAddingTodo = false;
  }

  editTodo(editedTodo: Todo) {
    this.store.dispatch(new actions.SaveTodo(editedTodo));
  }

  editAllTodos(editedTodos: Todo[]) {
    this.store.dispatch(new actions.SaveAllTodos(editedTodos));
  }

  deleteTodo(deletedTodo: Todo) {
    this.store.dispatch(new actions.DeleteTodo(deletedTodo));
  }

  goToTodo(todo: Todo) {
    this.navCtrl.push('TodoItemPage', {
      id: todo.id,
    });
  }

  doRefresh(refresher: Refresher) {
    this.store.dispatch(new actions.FetchTodos());

    this.refreshComplete$ = this.action$.ofType(actions.FETCH_TODOS_SUCCEEDED).takeUntil(this.destroy$);

    this.refreshComplete$.subscribe(() => {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
      refresher.complete();
    });
  }
}
