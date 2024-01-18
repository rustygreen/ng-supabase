// Angular.
import { Injectable } from '@angular/core';

// Local.
import { Message } from './message';
import { uuid } from '../crypto/uuid';
import { isString } from '../type-check/is-string';

export interface MessageRequest extends Partial<Message> {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

@Injectable({ providedIn: 'root' })
export abstract class NotifyService {
  show(message: string, title?: string): Message;
  show(target: MessageRequest): Message;
  show(targetOrMessage: MessageRequest | string, title?: string): Message {
    const asString = targetOrMessage as string;
    const asMessage = targetOrMessage as MessageRequest;
    const target = isString(targetOrMessage)
      ? {
          message: asString,
          title: title,
        }
      : asMessage;

    const message: Message = {
      id: target.id || uuid(),
      message: target.message || '',
      position: target.position || 'bottom-right',
      title: target.title || '',
      severity: target.severity || 'info',
    };

    this.showNotify(message);
    return message;
  }

  showInfo(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'info' });
  }

  showSuccess(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'success' });
  }

  showWarn(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'warn' });
  }

  showError(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'error' });
  }

  showFatal(target: MessageRequest): Message {
    return this.show({ ...target, severity: 'fatal' });
  }

  protected abstract showNotify(message: Message): void;
}
