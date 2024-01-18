// Angular.
import { Injectable } from '@angular/core';

// Local.
import { LogLevel } from './log-level';
import { KeyValue } from '../key-value';
import { LogConfig } from './log-config';
import { SupabaseConfig } from '../supabase-config';

interface LogEntry {
  level: LogLevel;
  timestamp: Date;
  message: string;
  error?: Error;
}

const DEFAULT_LOG_CONFIG: Required<LogConfig> = {
  logLevel: LogLevel.Warn,
  enabled: true,
  persistLogs: false,
};

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private readonly logs: LogEntry[] = [];
  private readonly config: Required<LogConfig>;
  private readonly consoleMap: KeyValue<(...data: unknown[]) => void> = {};

  constructor(config: SupabaseConfig) {
    this.config = { ...DEFAULT_LOG_CONFIG, ...config.logging };
    this.consoleMap[LogLevel.Trace] = console.trace;
    this.consoleMap[LogLevel.Debug] = console.debug;
    this.consoleMap[LogLevel.Info] = console.info;
    this.consoleMap[LogLevel.Warn] = console.warn;
    this.consoleMap[LogLevel.Error] = console.error;
    this.consoleMap[LogLevel.Fatal] = console.error;
  }

  log(level: LogLevel, message: string, error?: Error): void {
    const skip = this.config.enabled === false || level >= this.config.logLevel;

    if (skip) {
      return;
    }

    const args: unknown[] = [message];
    if (error) {
      args.push(error);
    }

    this.consoleMap[level].apply(console, args);
    if (this.config.persistLogs) {
      this.logs.push({ timestamp: new Date(), level, message, error });
    }
  }

  trace(message: string): void {
    this.log(LogLevel.Trace, message);
  }

  debug(message: string): void {
    this.log(LogLevel.Trace, message);
  }

  info(message: string): void {
    this.log(LogLevel.Trace, message);
  }

  warn(message: string, error?: Error): void {
    this.log(LogLevel.Trace, message, error);
  }

  error(message: string, error?: Error): void {
    this.log(LogLevel.Trace, message, error);
  }

  fatal(message: string, error?: Error): void {
    this.log(LogLevel.Trace, message, error);
  }
}
