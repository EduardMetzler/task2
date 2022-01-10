import { Component, OnInit } from '@angular/core'

import { UsersService } from 'src/app/services/users/users.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  users$ = this.usersService.users$

  ngOnInit(): void {
    this.usersService.getUsers()
  }
}
