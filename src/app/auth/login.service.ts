import { Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";

@Injectable()
export class LoginService {

  constructor(public matDialog: MatDialog ) {
  }

  public signIn(): Promise<boolean>{
    this.openAuthModal(false);
    return ;
  }

  public logIn(): Promise<boolean>{
    console.log("azeeaz")
    this.openAuthModal(true);
    return ;
  }

  public openAuthModal(mode:boolean): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-login";
    dialogConfig.data = {
      mode
    };
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
  }


}
