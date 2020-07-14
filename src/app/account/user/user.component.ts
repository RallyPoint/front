import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  public changeInformationdForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    passwordConf: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  changePasswordSubmit(){

  }

}
