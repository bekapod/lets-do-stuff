import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TodoItem } from '../../app/app.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage {

  todos: TodoItem[] = [
    {
      title: 'Todo Item 1',
      complete: false,
    },
    {
      title: 'Todo Item 2',
      complete: true,
    },
    {
      title: 'Todo Item 3',
      complete: false,
    },
  ];
  isAddingTodo: boolean = false;
  todo: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
  ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPage');
  }

  toggleAddTodo() {
    this.isAddingTodo = !this.isAddingTodo;
  }

  addTodo() {
    const newTodo: TodoItem = { title: this.todo.value.title, complete: false };
    this.todos.push(newTodo);
    this.todo.reset();
  }

}
