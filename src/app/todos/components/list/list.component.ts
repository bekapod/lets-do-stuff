import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Checkbox } from 'ionic-angular';
import { Todo } from '../../models';

@Component({
  selector: 'todos-list',
  templateUrl: 'list.component.html'
})
export class ListComponent {
  @Input() todos: Todo[];
  @Output() onTodoEditClicked = new EventEmitter<Todo>();
  @Output() onTodoEdited = new EventEmitter<Todo>();
  @Output() onTodoDeleted= new EventEmitter<Todo>();

  editTodo(todo: Todo) {
    this.onTodoEditClicked.emit(todo);
  }

  deleteTodo(todo: Todo) {
    this.onTodoDeleted.emit(todo);
  }

  setComplete(checkbox: Checkbox, todo: Todo) {
    this.onTodoEdited.emit({
      ...todo,
      complete: checkbox.checked,
    });
  }
}
