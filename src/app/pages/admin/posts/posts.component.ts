import { Component, OnInit } from '@angular/core'
import { PostsService } from 'src/app/services/posts/posts.service'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  posts$ = this.postsService.posts$

  ngOnInit(): void {
    this.postsService.loadPosts()
  }
}
