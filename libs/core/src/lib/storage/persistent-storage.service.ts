// Angular.
import { Injectable } from '@angular/core';

// Local.
import { KeyValue } from '../key-value';

@Injectable({
  providedIn: 'root',
})
export class PersistentStorageService {
  getJson<T = KeyValue>(key: string): T | null {
    const item = this.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  setJson(key: string, value: object): void {
    const json = JSON.stringify(value);
    this.setItem(key, json);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  clear(): void {
    localStorage.clear();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
