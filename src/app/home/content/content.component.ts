import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, computed, effect, inject, input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observe } from '../../decorators/observe';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnChanges {

  userService = inject(UserService);

  @Input()
  rEmail!: string;

  @Observe("rEmail") private rEmail$!: Observable<string>;

  email = input.required<string>();
  authorized = computed(() => this.email() === 'bill');
  other = toSignal(
    toObservable(this.email).pipe(
      switchMap(email => this.userService.getUserRights(email))
    ), { initialValue: '' }
  )
  
  right$?: Observable<string>;
  rRight$?: Observable<string>;


  constructor() {
    this.rRight$ = this.rEmail$.pipe(
      switchMap(email => this.userService.getUserRights(email))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['rEmail']) {
        this.right$ = this.userService.getUserRights(changes['rEmail'].currentValue);
      }
  }

}
