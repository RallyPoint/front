import { Component, OnInit } from '@angular/core';
import {FollowService} from "../follow.service";
import {AuthenticationService} from "../../auth/authentication.service";

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.scss']
})
export class FollowListComponent implements OnInit {

  public users: any[];

  constructor(private readonly followService: FollowService,
              private readonly authentificationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log("===>Follow",this.followService.myFollow);
    this.users = this.followService.myFollow;
  }

}
