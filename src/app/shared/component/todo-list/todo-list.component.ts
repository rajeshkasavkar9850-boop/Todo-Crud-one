import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../model/todos.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
 todosArr : Array<Itodo> =[]
  constructor(
    private todosService : TodosService
  ) { }

  ngOnInit(): void {
    this.todosService.fetchTodos()
    .subscribe({
      next : data =>{
        this.todosArr = data
        console.log(data)
      },
      error : err =>{
        console.log(err)
      }
    })
  }

}
