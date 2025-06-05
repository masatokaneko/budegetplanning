import { logger } from '@/lib/logger';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    logger.error('Application error', {
      code: error.code,
      message: error.message,
      details: error.details
    });
    return error;
  }

  if (error instanceof Error) {
    logger.error('Unexpected error', {
      message: error.message,
      stack: error.stack
    });
    return new AppError(
      '予期せぬエラーが発生しました',
      'UNEXPECTED_ERROR',
      500,
      { originalError: error.message }
    );
  }

  logger.error('Unknown error', { error });
  return new AppError(
    '不明なエラーが発生しました',
    'UNKNOWN_ERROR',
    500,
    { originalError: String(error) }
  );
};

export const validateDateRange = (startDate: Date, endDate: Date): void => {
  if (startDate > endDate) {
    throw new AppError(
      '開始日は終了日より前の日付を指定してください',
      'INVALID_DATE_RANGE',
      400
    );
  }

  const maxRange = 12; // 最大12ヶ月
  const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());

  if (diffMonths > maxRange) {
    throw new AppError(
      `日付範囲は${maxRange}ヶ月以内にしてください`,
      'DATE_RANGE_TOO_LARGE',
      400
    );
  }
};

export const validateExportFormat = (format: string): void => {
  const validFormats = ['excel', 'csv'];
  if (!validFormats.includes(format)) {
    throw new AppError(
      `無効な出力形式です。有効な形式: ${validFormats.join(', ')}`,
      'INVALID_EXPORT_FORMAT',
      400
    );
  }
};

export const validateAccountTypes = (types: string[]): void => {
  const validTypes = ['cost_of_sales', 'selling_admin'];
  const invalidTypes = types.filter(type => !validTypes.includes(type));

  if (invalidTypes.length > 0) {
    throw new AppError(
      `無効な科目種別が含まれています: ${invalidTypes.join(', ')}`,
      'INVALID_ACCOUNT_TYPES',
      400
    );
  }
}; 