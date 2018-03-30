import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  public todo;
  public title: string;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }

  private getWithCompleted(completed: Boolean) {
    return this.todos.filter(todo => todo.completed === completed);
  }

  public getRemaining() {
    return this.getWithCompleted(false);
  }

  public getCompleted() {
    return this.getWithCompleted(true);
  }

  public clearComplete(){
    this.getCompleted().forEach((todo)=>{
      this.deleteTodo(todo.id);
    })
  }

  addItem(title){
    let completed = false;
    this.title = '';
    this.todoService.addItem({ title,completed } as Todo).subscribe((res)=>{
      this.todos.push(res);
    })
  }

  public getTodo(id){
    this.todoService.getTodo(id).subscribe((res)=>{
      this.todo = res;
    })
  }

  public save(todo){
    this.todoService.updateTodo(todo).subscribe();
  }

  public deleteTodo(id){
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todoService.deleteTodo(id).subscribe();
  }

  public getTodos(){
    this.todoService.getTodos().subscribe((todos)=>{
      this.todos = todos
    });
  }

  public changeAll(select: boolean){
    this.todos.forEach((todo)=>{
      todo.completed = select;
      this.todoService.updateTodo(todo).subscribe();
    })
  }

}
