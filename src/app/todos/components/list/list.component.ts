import { Component, Input } from '@angular/core';
import { Todo } from '../../models';

@Component({
  selector: 'todos-list',
  templateUrl: 'list.component.html'
})
export class ListComponent {
  @Input() todos: Todo[];
}
