import { Routes } from '@angular/router';
import { AddTodoComponent } from './Components/add-todo/add-todo.component';
import { TodoDetailsComponent } from './Components/todo-details/todo-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'addTodo', pathMatch: 'full' },
  { path: 'addTodo', component: AddTodoComponent },
  { path: 'todoList', component: TodoDetailsComponent },
];
