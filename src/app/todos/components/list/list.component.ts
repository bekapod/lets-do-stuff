import { pathOr } from 'ramda';
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

  getDueDateClass(todo: Todo): string {
    const dueDate = pathOr(null, ['dueDate'], todo);

    if (!dueDate) {
      return '';
    }

    const dueDateObj = new Date(dueDate);
    dueDateObj.setHours(0, 0, 0, 0);

    const today = new Date(Date.now());
    today.setHours(0, 0, 0, 0);

    if (dueDateObj.getTime() === today.getTime()) {
      return 'is-due';
    }

    dueDateObj.setDate(dueDateObj.getDate() - 1);
    if (dueDateObj.getTime() === today.getTime()) {
      return 'is-nearly-due';
    }

    return '';
  }
}
