import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isLoggedIn = localStorage.getItem('loggedIn')
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  Logout() {
    localStorage.removeItem('loggedIn')
  }
}
