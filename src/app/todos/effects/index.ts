import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import * as fromTodos from '../reducers';
import * as rootMessages from '../../actions/messages';
import * as rootLoading from '../../actions/loading';
import * as todos from '../actions';
import { TodoList } from '../models';

@Injectable()
export class TodoEffects {
  constructor(
    private action$: Actions,
    private db: AngularFireDatabase,
    private store: Store<fromTodos.State>,
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
    .withLatestFrom(this.store.select(fromTodos.getTodosAsArray))
    .switchMap(([action, todosArray]) => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        const id = this.db.createPushId();
        const order = todosArray.length;
        this.db.object(`/todos/${id}`)
          .set({
            ...action.payload,
            id,
            order,
          })
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
    .switchMap(action => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        this.db.object(`/todos/${action.payload.id}`)
          .update(action.payload)
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
  saveAllTodos$ = this.action$
    .ofType<todos.SaveAllTodos>(todos.SAVE_ALL_TODOS)
    .switchMap(action => (
      Observable.create((observer) => {
        observer.next({ type: rootLoading.SHOW });

        const newTodoList: TodoList = action.payload.reduce((todoList, todo) => {
          todoList[todo.id] = todo;
          return todoList;
        }, {});

        console.log(newTodoList);

        this.db.object(`/todos`)
          .update(newTodoList)
          .then(() => {
            observer.next({ type: todos.SAVE_ALL_TODOS_SUCCEEDED });
          })
          .catch(() => {
            observer.next({ type: todos.SAVE_ALL_TODOS_FAILED });
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
