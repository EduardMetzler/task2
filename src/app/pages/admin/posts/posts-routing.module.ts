import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PostsComponent } from './posts.component'

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'posts-details',

    loadChildren: () =>
      import('./post-details/posts-details.module').then(
        (m) => m.PostsDetailsModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
