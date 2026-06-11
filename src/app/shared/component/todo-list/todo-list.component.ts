import { Component, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../model/todos.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../services/snackBar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
 todosArr : Array<Itodo> =[]
  constructor(
    private todosService : TodosService,
    private matDialog : MatDialog,
    private snackBar : SnackbarService
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

  trackByFun(index : number, todo : Itodo){
    return todo.todoId
  }

   onEditTodo(todo:Itodo){
    console.log(todo)
   this.todosService.editTodoSub$.next(todo)
  }

  onRemove(id:string){
    let matConfig = new MatDialogConfig()
    matConfig.width = '400px',
    matConfig.disableClose = true
    matConfig.data = `Are you sure, you want to remove todo which id "${id}"`
    let matRef = this.matDialog.open(GetConfirmComponent,matConfig)

    matRef.afterClosed().subscribe(res =>{
      if(res){
        this.todosService.onRemoveTodo(id)
        .subscribe({
          next: res =>{
            this.snackBar.openSnackBar(res.msg)
          },
          error: err =>{
            this.snackBar.openSnackBar(err.msg)
          }
        })
      }
    })
  }

 

}
