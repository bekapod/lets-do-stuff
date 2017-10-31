import { pathOr } from 'ramda';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models';

@Component({
  selector: 'todos-edit',
  templateUrl: 'edit.component.html'
})
export class EditComponent implements OnChanges {
  @Input() todo: Todo;
  @Output() onTodoEdited = new EventEmitter<Todo>();
  edit: FormGroup;
  isValid: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.edit = this.formBuilder.group({
      title: [pathOr('', ['title'], this.todo), Validators.required],
      description: [pathOr('', ['description'], this.todo)],
    });

    this.edit.valueChanges.subscribe(() => {
      this.isValid = this.getIsValid();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.todo = pathOr(null, ['todo', 'currentValue'], changes);
    this.edit.setValue({
      title: pathOr('', ['title'], this.todo),
      description: pathOr('', ['description'], this.todo),
    });
  }

  getIsValid() {
    return this.edit.valid;
  }

  editTodo() {
    this.isValid = this.getIsValid();

    if (!this.isValid) { return; }

    const editedTodo: Todo = { ...this.todo, ...this.edit.value };
    this.onTodoEdited.emit(editedTodo);
  }
}
