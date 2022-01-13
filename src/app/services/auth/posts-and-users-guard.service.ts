import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class PostsAndUsersGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredPermissions = route.data.requiredPermissions

    const permissions = this.auth.permissions.pipe(
      map((permissionsListe: any) => {
        const myPermissions = permissionsListe.find(
          (i: any) => i === requiredPermissions,
        )
        console.log(myPermissions)
        return myPermissions !== undefined
      }),
    )

    return permissions
  }
}
