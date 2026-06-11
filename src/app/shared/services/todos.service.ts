import { Injectable } from "@angular/core";
import { Itodo } from "../model/todos.model";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";


@Injectable({
    providedIn:'root'
})

export class TodosService{
    todosArr:Array<Itodo> = [
  {
    todoId: '101',
    todoItem: 'Learn Angular Services'
  },
  {
    todoId: '102',
    todoItem: 'Practice RxJS'
  },
  {
    todoId: '103',
    todoItem: 'Build CRUD App'
  },
  {
    todoId: '104',
    todoItem: 'Understand Dependency Injection'
  },
  {
    todoId: '105',
    todoItem: 'Learn Angular Routing'
  }
];

 constructor(
  private http : HttpClient
 ){}

fetchTodos():Observable<Itodo[]>{
  return of(this.todosArr)
}

// fetchTodos():Observable<any>{
//   return this.http.get('https://jsonplaceholder.typicode.com/todos') // it return >> Obsevable
// }

}