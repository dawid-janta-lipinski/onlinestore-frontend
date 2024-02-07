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
          map((user) => {
            this.router.navigate(['/']);
            this.notifierService.notify('success', 'Succesfully logged-in!');
            return AuthActions.loginSuccess({ user: { ...user } });
          }),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: 'An error occurd' })),
          ),
        );
      }),
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      switchMap((action) => {
        return this.authSerivce.autoLogin().pipe(
          map((user) => {
            this.router.navigate(['/']);
            return AuthActions.autoLoginSuccess({ user: { ...user } });
          }),
          catchError((err) => of(AuthActions.autoLoginFailure())),
        );
      }),
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return this.authSerivce.logout().pipe(
          map(() => {
            this.router.navigate(['/login']);
            this.notifierService.notify('success', 'Succesfully logged-out!');
            return AuthActions.logoutSuccess();
          }),
          catchError((err) => {
            this.notifierService.notify(
              'warning',
              'You are already logged out',
            );
            return of(AuthActions.logoutFailure());
          }),
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
            of(
              AuthActions.registerFailure({
                error: 'User with this email or login already exists!',
              }),
            ),
          ),
        );
      }),
    );
  });

  activate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.activate),
      switchMap((action) => {
        return this.authSerivce.activateAccount(action.uid).pipe(
          map(() => {
            this.router.navigate(['/login']);
            this.notifierService.notify(
              'success',
              'Succesfully activated your account! Happy shopping :)',
            );
            return AuthActions.activateSuccess();
          }),
          catchError((err) =>
            of(
              AuthActions.activateFailure({ error: 'This user doesnt exist!' }),
            ),
          ),
        );
      }),
    );
  });

  passwordRecovery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.passwordRecovery),
      switchMap((action) => {
        return this.authSerivce.recoverPassword({ email: action.email }).pipe(
          map(() => {
            this.router.navigate(['/']);
            this.notifierService.notify(
              'success',
              'Check your email and set a new password!',
            );
            return AuthActions.passwordRecoverySuccess();
          }),
          catchError((err) =>
            of(
              AuthActions.passwordRecoveryFailure({
                error: 'This email is incorrect!',
              }),
            ),
          ),
        );
      }),
    );
  });
  passwordChange$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.passwordChange),
      switchMap((action) => {
        return this.authSerivce
          .resetPassword({ password: action.password, uid: action.uid })
          .pipe(
            map(() => {
              this.router.navigate(['/login']);
              this.notifierService.notify('success', 'Password changed!');
              return AuthActions.passwordChangeSuccess();
            }),
            catchError((err) =>
              of(
                AuthActions.passwordChangeFailure({
                  error: 'An error occurd',
                }),
              ),
            ),
          );
      }),
    );
  });
}
