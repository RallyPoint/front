import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private readonly authentificationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authentificationService.logOut();
  }
}
