// Angular.
import {
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

// ng-supabase.
import { ActiveUserAvatarButtonComponent } from '@ng-supabase/primeng';

@Component({
  selector: 'ng-supabase-toolbar',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, ActiveUserAvatarButtonComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  @Output() showSettings = new EventEmitter<void>();

  openGitHub(): void {
    window.open('https://github.com/rustygreen/ng-supabase');
  }
}
