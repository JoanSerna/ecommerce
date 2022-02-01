import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthFacadeService } from '../auth/services/auth.facade.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private readonly authFacadeService: AuthFacadeService,
    private readonly router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacadeService.user$.pipe(
      map(user => !user),
      tap(isNotLoggedIn => {
        if (!isNotLoggedIn) {
          this.router.navigate(['/home']);
        }
      }),
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacadeService.user$.pipe(
      tap(isNotLoggedIn => {
        console.log({isNotLoggedIn});
        if (!isNotLoggedIn) {
          // this.router.navigate(['/home']);
        }
      }),
      map(user => !user),
    );
  }
}
