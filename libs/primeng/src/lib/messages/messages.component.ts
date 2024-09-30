// Angular.
import { Component, ChangeDetectionStrategy, input } from '@angular/core';

// 3rd party.
import { MessageModule } from 'primeng/message';

// Local.
import { Message } from './message';

@Component({
  selector: 'supabase-messages',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  messages = input<Message[]>([]);
}
