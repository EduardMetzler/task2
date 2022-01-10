import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { combineLatest } from 'rxjs'
import { PostsService } from 'src/app/services/posts/posts.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {}

  paramsId: any = 0

  post$ = combineLatest([this.postsService.post$, this.route.params]).pipe(
    map(([post, paramsId]) => {
      const params = paramsId['id']
      console.log(post, params)

      if (this.paramsId === 0) {
        this.paramsId = params
        this.postsService.loadPostsDetails(params)
      }

      return post
    }),
  )

  a: any = null

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.postsService.loadPostsDetails(0)
  }
}
