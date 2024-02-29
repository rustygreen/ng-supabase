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
  authChange = new Subject<AuthChangeEvent>();
  session = new BehaviorSubject<Session | null>(null);
  user = new BehaviorSubject<User | null>(null);
  displayName = new BehaviorSubject<string>('');
  loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  get isNotLoggedIn(): boolean {
    return !this.loggedIn.value;
  }

  constructor(
    private readonly zone: NgZone,
    private readonly log: LogService,
    private readonly config: SupabaseConfig
  ) {
    this.user.subscribe((user: User | null) => {
      const name = user ? user.email || user.id : '';
      this.displayName.next(name);
    });

    this.config.api.subscribe(() => this.setup());
  }

  waitForLoggedIn(): Promise<Session> {
    return firstValueFrom(
      this.loggedIn.pipe(
        filter(Boolean),
        map(() => this.session.value as Session)
      )
    );
  }

  private setup(): void {
    if (this.isLoggedIn) {
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
    if (event === 'SIGNED_IN') {
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
    this.loggedIn.next(true);

    if (data.session?.user) {
      this.user.next(data.session.user);
    }
  }

  private setStateForSignedOut(): void {
    this.session.next(null);
    this.loggedIn.next(false);
    this.user.next(null);
  }
}
