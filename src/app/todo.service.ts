import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {

  private todosUrl = 'api/todos';

  constructor(
    private http: HttpClient ) { }

    /* Get saved todo list */
    getTodos (): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.todosUrl)
        .pipe(
          tap(todos => this.log(`fetched todos`))
          // catchError(this.handleError('getTodos', []))
        );
    }
    
    addItem (todo: Todo): Observable<Todo> {
      return this.http.post<Todo>(this.todosUrl, todo, httpOptions).pipe(
        tap((todo: Todo) => this.log(`added todo task w/ id=${todo.id}`))
        // catchError(this.handleError<Todo>('addTodo'))
      );
    }

    deleteTodo (todo: Todo ): Observable<Todo> {
      const id = typeof todo === 'number' ? todo : todo.id;
      const url = `${this.todosUrl}/${id}`;
  
      return this.http.delete<Todo>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted todo id=${id}`))
        // catchError(this.handleError<Todo>('deleteTodo'))
      );
    }

    changeStatus(id) {
      this
      .map((o) => {
        if (o.id === id) {
          o.completed = !o.completed; 
        }
      });

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
