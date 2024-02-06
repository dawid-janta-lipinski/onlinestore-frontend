import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { selectAuthError } from '../../store/auth.selectors';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss'],
})
export class AccountActivationComponent implements OnInit, OnDestroy {
  errorMessage$: Observable<string | null> = this.store.select(selectAuthError);
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (paramMap) => {
        const uid: string = paramMap.get('uid') as string;
        this.store.dispatch(AuthActions.activate({ uid }));
      },
    });
  }
  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
