import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
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
    .switchMap(() => {
      return Observable.create((observer) => {
        this.db.object('/todos').valueChanges()
          .subscribe(items => {
            observer.next({ type: todos.FETCH_TODOS_SUCCEEDED, payload: items });
          }, error => {
            console.error(error);
            observer.next({ type: todos.FETCH_TODOS_FAILED, payload: error });
          });
      });
    });
}
