import { LogLevel } from './log-level';

export interface LogConfig {
  enabled?: boolean;
  logLevel?: LogLevel;
  persistLogs?: boolean;
}
