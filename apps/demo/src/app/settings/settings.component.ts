// Angular.
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  input,
  output,
  OnInit,
  inject,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

// 3rd party.
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// @ng-supabase
import { SupabaseConfig } from '@ng-supabase/core';
import { STORAGE_KEYS } from '../app.constants';

type Config = { url: string; key: string };

@Component({
  selector: 'ng-supabase-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  useConfigValues = input<boolean>(true);
  form!: FormGroup;
  config = inject(SupabaseConfig);
  saved = output<Config>();

  ngOnInit(): void {
    const { key, url } = this.useConfigValues()
      ? this.config.api.value
      : { key: '', url: '' };

    this.form = new FormGroup({
      url: new FormControl<string>(url, [Validators.required]),
      key: new FormControl<string>(key, [Validators.required]),
    });
  }

  save(): void {
    const url = SupabaseConfig.toApiUrl(this.form.value.url);
    const key = this.form.value.key as string;
    const config = { url, key };

    localStorage.setItem(STORAGE_KEYS.apiUrl, url);
    localStorage.setItem(STORAGE_KEYS.apiKey, key);

    this.config.api.next(config);
    this.saved.emit(config);
  }
}
