// Angular.
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
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

@Component({
  selector: 'ng-supabase-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;
  config = inject(SupabaseConfig);
  saved = output<void>();

  ngOnInit(): void {
    const { key, url } = this.config.api.value;

    this.form = new FormGroup({
      url: new FormControl(url, [Validators.required]),
      key: new FormControl(key, [Validators.required]),
    });
  }

  save(): void {
    this.config.api.next({ ...this.form.value });
  }
}
