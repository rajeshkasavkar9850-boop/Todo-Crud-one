import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { Itodo } from '../../model/todos.model';
import { SnackbarService } from '../../services/snackBar.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
 isInEditMode: boolean = false
 @ViewChild('todoForm') todoForm! : NgForm
  constructor(
    private todosService : TodosService,
    private snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
  }

  // onTodoSubmit(todoForm:NgForm){
  //   console.log(todoForm.value)
  // }

  onTodoSubmit(){
    if(this.todoForm.valid){
      let NEW_TODO : Itodo = {...this.todoForm.value,
        todoId : Date.now().toString()
      }
      this.todoForm.reset()
      this.todosService.addTodo(NEW_TODO)
                 .subscribe({
                  next : data =>{
                    console.log(data)
                    this.snackBar.openSnackBar(data.msg)
                  },
                  error : err =>{
                    console.log(err)
                  }
                  
                 })
    }
    
    
  }

}
