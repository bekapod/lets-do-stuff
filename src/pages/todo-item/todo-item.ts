import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { pathOr } from 'ramda';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  editForm: FormGroup;
  private todo$: Observable<Todo>;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromTodos.State>,
    private formBuilder: FormBuilder,
    private action$: Actions,
  ) {
    this.store.dispatch(new actions.SetCurrentTodo(this.navParams.get('id')));

    this.todo$ = this.store.select(fromTodos.getCurrentTodo);

    this.todo$.takeUntil(this.destroy$).subscribe(value => {
      this.todo = value;

      if (pathOr(false, ['title'], this.todo)) {
        this.editForm = this.createEditForm();
        this.destroy$.next(true);
      }
    });

    this.action$.ofType(actions.SAVE_TODO_SUCCEEDED).subscribe(() => {
      this.navCtrl.push('TodoListPage');
    });
  }

  createEditForm() {
    return this.formBuilder.group({
      title: [pathOr('', ['title'], this.todo), Validators.required],
      description: [pathOr('', ['description'], this.todo)],
    });
  }

  editTodo() {
    const editedTodo: Todo = { ...this.todo, ...this.editForm.value };
    this.store.dispatch(new actions.SaveTodo(editedTodo));
  }

}
