// Angular.
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  OnInit,
  inject,
  signal,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

// Local.
import { SupabaseConfig } from '../supabase-config';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'supabase-active-user-avatar-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-user-avatar-button.component.html',
  styleUrl: './active-user-avatar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveUserAvatarButtonComponent implements OnInit {
  loading = signal<boolean>(true);

  protected router = inject(Router);
  protected config = inject(SupabaseConfig);
  protected supabase = inject(SupabaseService);

  async ngOnInit(): Promise<void> {
    await this.supabase.clientReady;
    this.loading.set(false);
  }

  signOut(): void {
    this.supabase.client.auth.signOut();
    if (this.config.routes.postSignOut) {
      this.router.navigate([this.config.routes.postSignOut]);
    }
  }
}
