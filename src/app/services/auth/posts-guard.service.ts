import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PostsGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  permissions = this.auth.permissions.pipe(
    map((item: any) => {
      const myPermissions = item.find((i: any) => i === 'catalog.read')
      return myPermissions !== undefined
    }),
  )

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.permissions
  }
}
