import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http: HttpClient) {}

  user$ = new BehaviorSubject<any>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  })

  getUsers(userId: any) {
    // Add a request to get users using `endpoint`
    this.http.get<any>(`${this.endpoint}/${userId}`).subscribe((posts) => {
      this.user$.next(posts)
    })
  }
}
