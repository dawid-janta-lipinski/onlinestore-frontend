import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authSerivce: AuthService,
    private router: Router,
    private notifierService: NotifierService,
  ) {}
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) => {
        return this.authSerivce.login(action.loginData).pipe(
          map((user) => AuthActions.loginSuccess({ user: { ...user } })),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: 'An error occurd' })),
          ),
        );
      }),
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) => {
        return this.authSerivce.register(action.registerData).pipe(
          map((user) => {
            this.router.navigate(['/login']);
            this.notifierService.notify(
              'success',
              'Succesfully registered! Check your email and activate your account',
            );
            return AuthActions.registerSuccess();
          }),
          catchError((err) =>
            of(AuthActions.registerFailure({ error: 'An error occurd' })),
          ),
        );
      }),
    );
  });
}
