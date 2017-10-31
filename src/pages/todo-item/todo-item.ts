import { pathOr } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as fromTodos from '../../app/todos/reducers';
import * as actions from '../../app/todos/actions';
import { Todo } from '../../app/todos/models';

@IonicPage({
  defaultHistory: ['TodoListPage'],
  segment: 'item/:id',
})
@Component({
  selector: 'page-todo-item',
  templateUrl: 'todo-item.html',
})
export class TodoItemPage {

  todo: Todo;
  destroy$: Subject<boolean> = new Subject();
  private todo$: Observable<Todo>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromTodos.State>,
    private action$: Actions,
  ) {
    this.store.dispatch(new actions.SetCurrentTodo(this.navParams.get('id')));

    this.todo$ = this.store.select(fromTodos.getCurrentTodo);

    this.todo$.takeUntil(this.destroy$).subscribe(value => {
      if (pathOr(false, ['title'], value)) {
        this.todo = value;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
      }
    });

    this.action$.ofType(actions.SAVE_TODO_SUCCEEDED).subscribe(() => {
      this.navCtrl.push('TodoListPage');
    });
  }

  editTodo(editedTodo) {
    this.store.dispatch(new actions.SaveTodo(editedTodo));
  }

}
