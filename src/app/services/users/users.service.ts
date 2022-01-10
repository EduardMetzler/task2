import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private endpoint = 'https://jsonplaceholder.typicode.com/users'
  constructor(private http: HttpClient) {}

  getUsers() {
    // Add a request to get users using `endpoint`
    // this.http.get<any>(`${this.endpoint}/${userId}`).subscribe((posts) => {
  }
}
