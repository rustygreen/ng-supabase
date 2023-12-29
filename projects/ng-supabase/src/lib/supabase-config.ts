import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SupabaseConfig {
  url: string | null = null;
  key: string | null = null;
}
