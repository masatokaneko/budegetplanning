export const BUDGET_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const BUDGET_CATEGORIES = [
  '旅費交通費',
  '接待交際費',
  '会議費',
  '通信費',
  '消耗品費',
  '福利厚生費',
  '広告宣伝費',
  '研修費',
  'その他経費',
] as const;

export const BUDGET_DEPARTMENTS = [
  '営業部',
  '開発部',
  '管理部',
  '人事部',
  '経理部',
  '総務部',
] as const;

export const BUDGET_MONTHS = [
  { value: 1, label: '1月' },
  { value: 2, label: '2月' },
  { value: 3, label: '3月' },
  { value: 4, label: '4月' },
  { value: 5, label: '5月' },
  { value: 6, label: '6月' },
  { value: 7, label: '7月' },
  { value: 8, label: '8月' },
  { value: 9, label: '9月' },
  { value: 10, label: '10月' },
  { value: 11, label: '11月' },
  { value: 12, label: '12月' },
] as const;

export const BUDGET_STATUS_LABELS = {
  [BUDGET_STATUS.DRAFT]: '下書き',
  [BUDGET_STATUS.SUBMITTED]: '申請中',
  [BUDGET_STATUS.APPROVED]: '承認済',
  [BUDGET_STATUS.REJECTED]: '却下',
} as const;

export const BUDGET_STATUS_COLORS = {
  [BUDGET_STATUS.DRAFT]: 'gray',
  [BUDGET_STATUS.SUBMITTED]: 'blue',
  [BUDGET_STATUS.APPROVED]: 'green',
  [BUDGET_STATUS.REJECTED]: 'red',
} as const; 