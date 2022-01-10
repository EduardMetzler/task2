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

  params: any

  postDetails$ = this.postsService.post$

  ngOnInit(): void {
    this.postsService.loadPostsDetails(this.route.snapshot.params['id'])
  }

  ngOnDestroy(): void {}
}
