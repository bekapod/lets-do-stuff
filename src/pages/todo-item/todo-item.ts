import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
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
  private todo$: Observable<Todo>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<fromTodos.State>,
  ) {
    this.store.dispatch(new actions.SetCurrentTodo(this.navParams.get('id')));

    this.todo$ = this.store.select(fromTodos.getCurrentTodo);

    this.todo$.subscribe(value => {
      this.todo = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoItemPage');
    console.log(this.todo);
  }

}
