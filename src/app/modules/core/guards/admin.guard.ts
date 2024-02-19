import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, catchError, map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthUser } from '../../auth/store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isloggedIn().pipe(
      take(1),
      switchMap((resp) => {
        const isloggedIn = resp.message;
        if (isloggedIn) {
          return this.store.select(selectAuthUser).pipe(
            map((user) => {
              if (user && user.role === 'ADMIN') {
                return true;
              }
              return false;
            }),
          );
        }
        return of(false);
      }),
      catchError(() => {
        return of(false);
      }),
    );
  }
}
