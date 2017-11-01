import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as rootMessages from '../../actions/messages';
import * as rootLoading from '../../actions/loading';
import * as todos from '../actions';

@Injectable()
export class TodoEffects {
  constructor(
    private action$: Actions,
    private db: AngularFireDatabase,
  ) {}

  @Effect()
  fetchTodos$ = this.action$
    .ofType(todos.FETCH_TODOS)
    .switchMap(() => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        this.db.object('/todos')
          .valueChanges()
          .subscribe(items => {
            observer.next({ type: todos.FETCH_TODOS_SUCCEEDED, payload: items });
            observer.next({ type: rootLoading.HIDE });
          }, error => {
            console.error(error);
            observer.next({ type: todos.FETCH_TODOS_FAILED });
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
            observer.next({ type: rootLoading.HIDE });
          });
      })
    ));

  @Effect()
  addTodo$ = this.action$
    .ofType<todos.AddTodo>(todos.ADD_TODO)
    .map(action => action.payload)
    .switchMap(payload => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        const id = this.db.createPushId();
        this.db.object(`/todos/${id}`)
          .set({ ...payload, id })
          .then(() => {
            observer.next({ type: todos.ADD_TODO_SUCCEEDED });
            observer.next({ type: rootLoading.HIDE });
          })
          .catch((error: any) => {
            observer.next({ type: todos.ADD_TODO_FAILED });
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
            observer.next({ type: rootLoading.HIDE });
          });
      })
    ));

  @Effect()
  saveTodo$ = this.action$
    .ofType<todos.SaveTodo>(todos.SAVE_TODO)
    .map(action => action.payload)
    .switchMap(payload => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        this.db.object(`/todos/${payload.id}`)
          .update(payload)
          .then(() => {
            observer.next({ type: todos.SAVE_TODO_SUCCEEDED });
            observer.next({ type: rootMessages.ADD_SUCCESS, payload: 'Item saved' });
            observer.next({ type: rootLoading.HIDE });
          })
          .catch((error: any) => {
            observer.next({ type: todos.SAVE_TODO_FAILED });
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
            observer.next({ type: rootLoading.HIDE });
          });
      })
    ));

  @Effect()
  deleteTodo$ = this.action$
    .ofType<todos.DeleteTodo>(todos.DELETE_TODO)
    .map(action => action.payload)
    .switchMap(payload => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        this.db.object(`/todos/${payload.id}`)
          .remove()
          .then(() => {
            observer.next({ type: todos.DELETE_TODO_SUCCEEDED });
            observer.next({ type: rootMessages.ADD_SUCCESS, payload: 'Item deleted' });
            observer.next({ type: rootLoading.HIDE });
          })
          .catch((error: any) => {
            observer.next({ type: todos.DELETE_TODO_FAILED });
            observer.next({ type: rootMessages.ADD_ERROR, payload: error });
            observer.next({ type: rootLoading.HIDE });
          });
      })
    ));
}
