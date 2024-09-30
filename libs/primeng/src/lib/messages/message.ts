import { Message as PrimeMessage } from 'primeng/message';

export interface Message extends Partial<PrimeMessage> {
  severity: string;
  text: string;
}
