import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminGuard } from './services/auth/admin-guard.service'
import { LoginGuard } from './services/auth/login-guard.service'

// Using Angular Guards,
// Create a condition to allow access to /admin only if user is logged in
// When user is not logged in - always redirect to /login
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'admin',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
