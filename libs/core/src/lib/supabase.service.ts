// Angular.
import { Injectable, NgZone } from '@angular/core';

// 3rd party.
import { BehaviorSubject, Subject, filter, firstValueFrom, map } from 'rxjs';
import {
  User,
  Session,
  createClient,
  SupabaseClient,
  AuthChangeEvent,
} from '@supabase/supabase-js';

// Local.
import { SupabaseConfig } from './supabase-config';
import { LogService } from './logging/log.service';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  client!: SupabaseClient;
  readonly authChange = new Subject<AuthChangeEvent>();
  readonly initialized = new BehaviorSubject<boolean>(false);
  readonly session = new BehaviorSubject<Session | null>(null);
  readonly user = new BehaviorSubject<User | null>(null);
  readonly userDisplayName = new BehaviorSubject<string>('');
  readonly userSubheading = new BehaviorSubject<string>('');
  readonly userProfile = new BehaviorSubject<unknown>(null);
  readonly signedIn = new BehaviorSubject<boolean>(false);
  readonly loading = new BehaviorSubject<boolean>(true);
  readonly clientReady: Promise<SupabaseClient>;

  get isSignedIn(): boolean {
    return this.signedIn.value;
  }

  get isNotSignedIn(): boolean {
    return !this.signedIn.value;
  }

  constructor(
    private readonly zone: NgZone,
    private readonly log: LogService,
    private readonly config: SupabaseConfig
  ) {
    this.user.subscribe((user: User | null) => this.setUserInformation(user));

    this.clientReady = firstValueFrom(
      this.initialized.pipe(
        filter(Boolean),
        map(() => this.client)
      )
    );

    this.config.api.subscribe(() => this.setup());
  }

  waitForSignedIn(): Promise<Session> {
    return firstValueFrom(
      this.signedIn.pipe(
        filter(Boolean),
        map(() => this.session.value as Session)
      )
    );
  }

  private async setUserInformation(user: User | null): Promise<void> {
    const profileTable = this.config.profile.table;
    let displayName = '';

    if (user && profileTable) {
      this.log.debug(`Retrieving user profile for user ID '${user.id}'`);
      const { error, data } = await this.client
        .from(profileTable)
        .select()
        .eq(this.config.profile.userIdField, user.id)
        .limit(1)
        .single();

      if (error) {
        this.log.error(
          `Failed to retrieve user profile. ${error.details}`,
          error as unknown as Error
        );
      }

      if (data) {
        const firstName = data[this.config.profile.firstNameField];
        const lastName = data[this.config.profile.lastNameField];
        displayName = `${firstName || ''} ${lastName || ''}`.trim();
        this.log.debug(
          `Retrieving display name of '${displayName}' from profile`
        );
      } else {
        this.log.warn(`No profile found for user ID '${user.id}'`);
      }
    }

    displayName = displayName || this.extractDisplay(user);
    const subheading =
      displayName === user?.email
        ? ''
        : user?.user_metadata?.['title'] || user?.email || '';

    this.userDisplayName.next(displayName);
    this.userSubheading.next(subheading);
  }

  private extractDisplay(user: User | null): string {
    const { first_name, last_name } = user?.user_metadata || {};
    const display = `${first_name || ''} ${last_name || ''}`.trim();
    return user ? display || user.email || user.id : '';
  }

  private setup(): void {
    if (this.isSignedIn) {
      this.setStateForSignedOut();
    }

    this.createClient();
  }

  private createClient(): void {
    const { url, key } = this.config.api.value;
    this.client = createClient(url, key);
    this.client.auth.onAuthStateChange((event) => {
      this.zone.run(() => {
        this.setAuthState(event);
      });
    });
  }

  private setAuthState(event: AuthChangeEvent): void {
    this.log.info(`Auth state change: '${event}'`);
    this.authChange.next(event);
    if (event === 'INITIAL_SESSION') {
      this.initialized.next(true);
      this.loading.next(false);
    } else if (event === 'SIGNED_IN') {
      this.signedIn.next(true);
      this.tryGetSession();
    } else if (event === 'SIGNED_OUT') {
      this.setStateForSignedOut();
    }
  }

  private async tryGetSession(): Promise<void> {
    const { data, error } = await this.client.auth.getSession();
    const noSession = !error && !data.session;

    if (noSession) {
      this.log.error('No session information retrieved');
      return;
    }

    if (error) {
      this.log.error(`Failed to get user session`, error);
      return;
    }

    this.session.next(data.session);

    if (data.session?.user) {
      this.user.next(data.session.user);
    }
  }

  private setStateForSignedOut(): void {
    this.session.next(null);
    this.signedIn.next(false);
    this.user.next(null);
  }
}
