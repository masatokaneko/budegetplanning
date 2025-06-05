type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // コンソールに出力
    const consoleMethod = {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    }[entry.level];

    consoleMethod(
      `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
      entry.data || ''
    );
  }

  debug(message: string, data?: unknown): void {
    this.addLog(this.formatMessage('debug', message, data));
  }

  info(message: string, data?: unknown): void {
    this.addLog(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: unknown): void {
    this.addLog(this.formatMessage('warn', message, data));
  }

  error(message: string, data?: unknown): void {
    this.addLog(this.formatMessage('error', message, data));
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 