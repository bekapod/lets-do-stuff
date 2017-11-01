import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models';

@Component({
  selector: 'todos-add',
  templateUrl: 'add.component.html'
})
export class AddComponent {
  @Output() onTodoSubmitted = new EventEmitter<Todo>();
  todo: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  addTodo() {
    const newTodo: Todo = {
      id: null,
      title: this.todo.value.title,
      complete: false,
      created: `${Date.now()}`,
      order: null,
    };

    this.onTodoSubmitted.emit(newTodo);
    this.todo.reset();
  }
}
