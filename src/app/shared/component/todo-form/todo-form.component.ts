import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SnackbarService } from '../../services/snackBar.service';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../model/todos.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
 isInEditMode : boolean = false
 editTodo !: Itodo
 @ViewChild('todoFrom') todoFrom !: NgForm
  constructor(private todosService : TodosService,
              private snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
   this.onTodoPatch()
  }

   onTodoSubmit(){if(this.todoFrom.valid){
    let todoObj : Itodo = {
      ...this.todoFrom.value,todoId : Date.now().toString()
    }
    this.todoFrom.reset()
    this.todosService.addTodos(todoObj)
    .subscribe({
      next : data =>{
        this.snackbar.openSnackBar(data.msg)
      },
      error : err => this.snackbar.openSnackBar(err.msg)

    })
    
  }
  }

      onTodoPatch(){
       this.todosService.editTodoSub$.subscribe({
      next : data => {
        this.editTodo = data
        this.isInEditMode = true
        this.todoFrom.form.patchValue(data)
      }
    })
  }

  onUpdate(){
    if(this.todoFrom.valid){
       let UPDATED_OBJ:Itodo ={ ...this.todoFrom.value,
            todoId : this.editTodo.todoId
       }
      console.log(UPDATED_OBJ)
      this.todosService.updateTodo(UPDATED_OBJ)
      .subscribe({
        next : data =>{
         this.snackbar.openSnackBar(data.msg)
         this.todoFrom.reset()
         this.isInEditMode = false
        },
        error : err =>{
          this.snackbar.openSnackBar(err.msg)
        }
      })
    }
  }


  
}
