import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as rootMessages from '../../actions/messages';
import * as todos from '../actions';

@Injectable()
export class TodoEffects {
  constructor(
    private action$: Actions,
    public db: AngularFireDatabase
  ) {}

  @Effect()
  fetchTodos$ = this.action$
    .ofType(todos.FETCH_TODOS)
    .switchMap(() => (
      Observable.create((observer) => {
        this.db.object('/todos')
          .valueChanges()
          .subscribe(items => {
            observer.next({ type: todos.FETCH_TODOS_SUCCEEDED, payload: items });
          }, error => {
            console.error(error);
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
          });
      })
    ));

  @Effect()
  addTodo$ = this.action$
    .ofType<todos.AddTodo>(todos.ADD_TODO)
    .map(action => action.payload)
    .switchMap(payload => (
      Observable.create((observer) => {
        this.db.object(`/todos/${this.db.createPushId()}`)
          .set(payload)
          .then(() => {
            observer.next({ type: todos.ADD_TODO_SUCCEEDED });
          })
          .catch((error: any) => {
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
          });
      })
    ));
}
