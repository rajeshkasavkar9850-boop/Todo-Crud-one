import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule} from "@angular/material/dialog";
import { MatSnackBarModule} from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";

let matArr = [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule
]

@NgModule({
   imports: [...matArr],
   exports: [...matArr]
})

export class MaterialModule{

}