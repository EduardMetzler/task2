import { Component, OnInit } from '@angular/core'
import { PostsService } from 'src/app/services/posts/posts.service'
import { PageEvent } from '@angular/material/paginator'
import { map } from 'rxjs/operators'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { PageDaten } from 'src/app/interface'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  // posts$ = this.postsService.posts$

  posts: any = []

  // posts$ = this.postsService.posts$.pipe(
  //   map((posts) => {
  //     this.posts = posts
  //     this.pageSlice = this.posts.slice(0, 10)
  //     return posts
  //   }),
  // )
  // pageSlice = this.posts.slice(0, 10)

  pageDaten$ = new BehaviorSubject<PageEvent>({
    length: 100,
    pageIndex: 0,
    pageSize: 10,
    previousPageIndex: 0,
  })

  posts$ = combineLatest([this.postsService.posts$, this.pageDaten$]).pipe(
    map(([posts, pageDaten]) => {
      const startIndex = pageDaten.pageIndex * pageDaten.pageSize
      let endIndex = startIndex + pageDaten.pageSize
      if (endIndex > posts.length) {
        endIndex = posts.length
      }
      console.log(startIndex, endIndex)

      const pageSlice = posts.slice(startIndex, endIndex)
      return pageSlice
    }),
  )

  ngOnInit(): void {
    this.postsService.loadPosts()
    this.posts$.subscribe()
    // this.pageSlice = this.posts.slice(0, 10)
  }

  OnPageChange(event: PageEvent) {
    console.log(event)
    this.pageDaten$.next(event)

    // const startIndex = event.pageIndex * event.pageSize
    // let endIndex = startIndex + event.pageSize
    // if (endIndex > this.posts.length) {
    //   endIndex = this.posts.length
    // }
    // this.pageSlice = this.posts.slice(startIndex, endIndex)
    // console.log(this.pageSlice)
    // this.a = { startIndex: 10, endIndex: 20 }
    // console.log(this.a)

    // console.log(startIndex, endIndex)
  }
}
