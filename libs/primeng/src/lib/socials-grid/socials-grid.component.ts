// Angular.
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Provider } from '@supabase/supabase-js';

// ng-supabase.
import {
  LogService,
  SocialSignIn,
  SupabaseConfig,
  SupabaseService,
  SocialSignInItem,
} from '@ng-supabase/core';

@Component({
  selector: 'supabase-socials-grid',
  standalone: true,
  imports: [CommonModule, DividerModule, ButtonModule],
  templateUrl: './socials-grid.component.html',
  styleUrl: './socials-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialsGridComponent {
  @Input() subtitle = 'or sign in with';
  @Output() errorMessage = new EventEmitter<string>();
  socialItems: SocialSignInItem[] = [];

  get hasSocials(): boolean {
    return this.socialItems.length > 0;
  }

  get hasNoSocials(): boolean {
    return this.socialItems.length === 0;
  }

  protected readonly log = inject(LogService);
  protected readonly config = inject(SupabaseConfig);
  protected readonly supabase = inject(SupabaseService);

  constructor() {
    const { signIn } = inject(SupabaseConfig);
    this.socialItems = signIn.socialSignInItems;
  }

  async signInWithSocial(social: SocialSignIn): Promise<void> {
    const result = this.config.signIn.onSocialSignIn?.(social);
    if (result === false) {
      return;
    }

    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: social as Provider,
    });

    if (error) {
      this.log.debug(
        `Unable to sign in with social '${social}'. ${error.message}`
      );
      this.errorMessage.emit(error.message);
      return;
    }
  }
}
