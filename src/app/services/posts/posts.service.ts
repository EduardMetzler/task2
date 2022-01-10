import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'

interface IPost {
  userId: number
  id: number
  title: string
  body: string
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts$ = new BehaviorSubject<IPost[]>([])

  post$ = new BehaviorSubject<IPost>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  })

  private endpoint = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private http: HttpClient) {}

  loadPosts() {
    // Add a request to get posts using `endpoint`
    if (this.posts$.value.length) {
      return
    }
    this.http.get<IPost[]>(this.endpoint).subscribe((posts) => {
      this.posts$.next(posts)
    })
  }

  loadPostsDetails(postId: any) {
    console.log(postId)
    if (postId === 0) {
      return this.post$.next({ userId: 0, id: 0, title: '', body: '' })
    }

    this.http.get<IPost>(`${this.endpoint}/${postId}`).subscribe((post) => {
      console.log(post)
      this.post$.next(post)
    })
  }
}
