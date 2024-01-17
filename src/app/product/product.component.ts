import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  userService = inject(UserService);
  id = input.required<string>();
  product = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.userService.getProductById(id))
    ), { initialValue: '' }
  )

}
