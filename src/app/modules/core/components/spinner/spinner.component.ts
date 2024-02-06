import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthLoading } from 'src/app/modules/auth/store/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  constructor(private store: Store<AppState>) {}
}
