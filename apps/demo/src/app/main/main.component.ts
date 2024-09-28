// Angular.
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { Subscription } from 'rxjs';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { FieldsetModule } from 'primeng/fieldset';

// ng-supabase.
import { ToastModule } from 'primeng/toast';
import { SupabaseService } from '@ng-supabase/core';

// Local.
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'ng-supabase-main',
  standalone: true,
  imports: [
    ChipModule,
    ToastModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    DrawerModule,
    FieldsetModule,
    ToolbarComponent,
    SettingsComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy {
  showSettingsSidebar = false;

  private readonly subscriptions: Subscription[] = [];

  constructor(
    readonly supabase: SupabaseService,
    private readonly changeDetector: ChangeDetectorRef
  ) {
    this.supabase.signedIn.subscribe(() => {
      // TODO: Determine why "markForCheck" is not working here - @rusty.green
      setTimeout(() => this.changeDetector.detectChanges());
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  showSettings(event?: MouseEvent): void {
    this.showSettingsSidebar = true;
    if (event) {
      event.preventDefault();
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.client.auth.signOut();
  }
}
