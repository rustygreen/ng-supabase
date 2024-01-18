// Angular.
import { Injectable } from '@angular/core';

// 3rd party.
import { MessageService } from 'primeng/api';

// ng-supabase.
import {
  Message,
  MessageRequest,
  NotifyService as CoreNotifyService,
} from '@ng-supabase/core';

@Injectable({ providedIn: 'root' })
export class NotifyService extends CoreNotifyService {
  constructor(private readonly messageService: MessageService) {
    super();
  }

  protected override showNotify(message: Message): void {
    this.messageService.add({
      ...message,
      summary: message.title,
      detail: message.message,
    });
  }

  override showFatal(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'error' });
  }
}
