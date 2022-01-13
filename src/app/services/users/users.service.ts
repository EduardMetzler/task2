import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from 'src/app/interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http: HttpClient) {}

  users$ = new BehaviorSubject<any[]>([])
  user$ = new BehaviorSubject<any>(null)

  getUsers() {
    // Add a request to get users using `endpoint`
    this.http.get<any>(`${this.endpoint}`).subscribe((users) => {
      this.users$.next(users)
    })
  }

  loadUserDetails(userId: number) {
    this.user$.next(null)
    this.http.get<any>(`${this.endpoint}/${userId}`).subscribe((user) => {
      console.log(user)
      this.user$.next(user)
    })
  }
}
