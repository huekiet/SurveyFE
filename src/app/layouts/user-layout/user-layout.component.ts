import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
  user: any;
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromCookie();
  }

}
