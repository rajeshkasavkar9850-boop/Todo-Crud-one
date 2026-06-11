


import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar : MatSnackBar) { }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close', {
      horizontalPosition : 'left',
      verticalPosition : 'top',
      duration : 3000
    })
  }
}