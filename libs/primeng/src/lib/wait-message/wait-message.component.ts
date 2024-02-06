// Angular.
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

// 3rd party.
import { FieldsetModule } from 'primeng/fieldset';

// @ng-supabase
import { WaitMessage } from '@ng-supabase/core';

@Component({
  selector: 'supabase-wait-message',
  standalone: true,
  imports: [CommonModule, FieldsetModule],
  templateUrl: './wait-message.component.html',
  styleUrl: './wait-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WaitMessageComponent {
  @Input({ required: true }) message!: WaitMessage | null | undefined;
  @Input() mainTitle = `Didn't receive it?`;
  @Input() sendAgainLabel = `send again`;
  @Input() cancelLabel = `cancel`;
  @Input() showSendAgain = true;
  @Input() showCancel = true;
  @Input() subTitle = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() sendAgain = new EventEmitter<void>();
}
