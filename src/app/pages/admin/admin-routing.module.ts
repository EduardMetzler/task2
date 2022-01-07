import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PostsGuard } from 'src/app/services/auth/posts-guard.service'
import { UsersGuard } from 'src/app/services/auth/users-guard.service'
import { AdminComponent } from './admin.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  // Allow acces to /posts if user has 'catalog.read' permissions
  {
    path: 'posts',
    loadChildren: () =>
      import('./posts/posts.module').then((m) => m.PostsModule),
    canActivate: [PostsGuard],
  },
  // Allow acces to /users if user has 'user.read' permissions
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [UsersGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
