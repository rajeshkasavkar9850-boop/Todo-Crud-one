import { Injectable } from "@angular/core";
import { Itodo, ItodoRes } from "../model/todos.model";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";


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
 editTodoSub$ :Subject<Itodo> = new Subject<Itodo>()
 constructor(
  private http : HttpClient
 ){}

fetchTodos():Observable<Itodo[]>{
  return of(this.todosArr)
}

 addTodos(todo : Itodo) : Observable<ItodoRes>{
    this.todosArr.push(todo)
    let res = {
      msg : `New Todo Item Is ${todo.todoId} Is Added successfully`,
      data : todo
    }
    return of(res)
  }


 onRemoveTodo(removeId : string):Observable<ItodoRes>{
    let getindex = this.todosArr.findIndex(s => s.todoId === removeId)
    let removedId = this.todosArr.splice(getindex,1)
    return of({
      msg : `The Todo Item Is Removed successfully !!`,
      data : removedId[0]
    })
  }

  updateTodo(updatedTodo :Itodo):Observable<ItodoRes>{
    let GET_INDEX = this.todosArr.findIndex(t =>t.todoId === updatedTodo.todoId)
     this.todosArr[GET_INDEX] = updatedTodo

     return of({
      msg :`The todo item "${updatedTodo.todoItem}" is updated successfully!!`,
      data : updatedTodo
     })
  }


}