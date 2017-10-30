import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models';

@Component({
  selector: 'todos-list',
  templateUrl: 'list.component.html'
})
export class ListComponent {
  @Input() todos: Todo[];
  @Output() onTodoEdited = new EventEmitter<Todo>();

  editTodo(todo: Todo) {
    this.onTodoEdited.emit(todo);
  }
}
