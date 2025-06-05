export const VALIDATION_RULES = {
  BUDGET: {
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 1000000000,
    MIN_YEAR: 2000,
    MAX_YEAR: 2100,
    MIN_MONTH: 1,
    MAX_MONTH: 12
  },
  FACTOR: {
    MIN_CONFIDENCE: 0,
    MAX_CONFIDENCE: 100,
    MIN_VALUE: -100,
    MAX_VALUE: 100
  },
  USER: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_NAME_LENGTH: 50,
    MAX_EMAIL_LENGTH: 100
  },
  DEPARTMENT: {
    MAX_NAME_LENGTH: 50,
    MAX_CODE_LENGTH: 10
  },
  CATEGORY: {
    MAX_NAME_LENGTH: 50,
    MAX_CODE_LENGTH: 10
  }
} as const;

export const ERROR_MESSAGES = {
  BUDGET: {
    INVALID_AMOUNT: '金額は0以上、10億円以下である必要があります',
    INVALID_YEAR: '年は2000年から2100年の間である必要があります',
    INVALID_MONTH: '月は1から12の間である必要があります'
  },
  FACTOR: {
    INVALID_CONFIDENCE: '信頼度は0から100の間である必要があります',
    INVALID_VALUE: '値は-100から100の間である必要があります'
  },
  USER: {
    INVALID_PASSWORD: 'パスワードは8文字以上である必要があります',
    INVALID_NAME: '名前は50文字以下である必要があります',
    INVALID_EMAIL: 'メールアドレスは100文字以下である必要があります'
  },
  DEPARTMENT: {
    INVALID_NAME: '部門名は50文字以下である必要があります',
    INVALID_CODE: '部門コードは10文字以下である必要があります'
  },
  CATEGORY: {
    INVALID_NAME: 'カテゴリ名は50文字以下である必要があります',
    INVALID_CODE: 'カテゴリコードは10文字以下である必要があります'
  }
} as const; 