import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from './content/content.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  email1 = 'bill';
  email2 = 'toto';
}
