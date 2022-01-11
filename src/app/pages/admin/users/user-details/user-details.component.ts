import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/services/posts/posts.service'
import { UsersService } from 'src/app/services/users/users.service'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private route: ActivatedRoute,
  ) {}

  user$ = this.usersService.user$

  posts$ = this.postsService.posts$.pipe(
    map((posts) => {
      return posts.filter((post) => {
        return post.userId == this.route.snapshot.params['id']
      })
    }),
  )

  ngOnInit(): void {
    this.usersService.loadUserDetails(this.route.snapshot.params['id'])
    this.postsService.loadPosts()
  }
}
