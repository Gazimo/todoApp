import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo'

const apiUrl = 'api/todos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {


  constructor(private http: HttpClient ) { }

  /* Get saved todo list */
  public getTodos (): Observable<Todo[]> {
    return this.http.get<Todo[]>(apiUrl);
  }

  public getTodo(id): Observable<Todo> {
    let url = `${apiUrl}/${id}`;
    return this.http.get<Todo>(url);
  }

  addItem (todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(apiUrl, todo, httpOptions);
  }

  deleteTodo(id): Observable<Todo[]> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Todo[]>(url, httpOptions);
  }

  updateTodo(todo): Observable<any> {
    return this.http.put(apiUrl, todo, httpOptions);
  }

  // clearChecked() {
  //   this.todos = this.todos.filter(o => !o.completed);

  // }

  // selectAll(flag: boolean) {
  //   this.todos = this.todos.map(todo => {
  //     return {
  //       ...todo,
  //       completed: flag,
  //     };
  //   });

  // this.todos.forEach(todo => todo.status = flag);
  // this.observeTodo();


}
