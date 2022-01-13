import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

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
  postsOfUser$ = new BehaviorSubject<IPost[]>([])

  post$ = new BehaviorSubject<{
    user: any
    userId: number
    id: number
    title: string
    body: string
  } | null>(null)

  user$ = new BehaviorSubject<any>({})

  postDetails$ = combineLatest([this.post$, this.user$]).pipe(
    map(([post, user]) => {
      var details = { ...user, ...post }

      return details
    }),
  )

  private endpoint = 'https://jsonplaceholder.typicode.com/posts'
  constructor(private http: HttpClient) {}

  getUser(userId: any) {
    return this.http.get<any>(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    )
  }

  loadPosts() {
    // Add a request to get posts using `endpoint`
    if (this.posts$.value.length) {
      return
    }
    this.http.get<IPost[]>(this.endpoint).subscribe((posts) => {
      this.posts$.next(posts)
    })
  }

  loadPostsDetails(postId: number) {
    this.post$.next(null)
    this.http
      .get<IPost>(`${this.endpoint}/${postId}`)
      .pipe(
        switchMap((post) => {
          return this.getUser(post.userId).pipe(
            map((user) => {
              return { ...post, user }
            }),
          )
        }),
      )

      .subscribe((post) => {
        this.post$.next(post)
      })
  }

  getPostsOfUser(userId: any) {
    this.http
      .get<any>(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .subscribe((postsOfUser) => {
        console.log(postsOfUser)
        this.postsOfUser$.next(postsOfUser)
      })
  }
}
