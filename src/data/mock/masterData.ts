// src/data/mock/masterData.ts
// マスタデータのモック

import { Account, Vendor, FluctuationFactor, User, Role } from '@/types/master';

// 勘定科目マスタ
export const mockAccounts: Account[] = [
  // 売上原価
  {
    account_id: 'acc_001',
    account_code: '5101',
    account_name: '外注費',
    account_category: 'cost_of_sales',
    display_order: 1,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_002',
    account_code: '5102',
    account_name: 'ソフトウェア減価償却費',
    account_category: 'cost_of_sales',
    display_order: 2,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_003',
    account_code: '5103',
    account_name: '代理販売仕入',
    account_category: 'cost_of_sales',
    display_order: 3,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },

  // 販管費
  {
    account_id: 'acc_101',
    account_code: '6101',
    account_name: '情報システム利用料',
    account_category: 'selling_admin',
    display_order: 11,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_102',
    account_code: '6102',
    account_name: '賃借料',
    account_category: 'selling_admin',
    display_order: 12,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_103',
    account_code: '6103',
    account_name: '通信費',
    account_category: 'selling_admin',
    display_order: 13,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_104',
    account_code: '6104',
    account_name: '旅費交通費',
    account_category: 'selling_admin',
    display_order: 14,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_105',
    account_code: '6105',
    account_name: '広告宣伝費',
    account_category: 'selling_admin',
    display_order: 15,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_106',
    account_code: '6106',
    account_name: '採用費',
    account_category: 'selling_admin',
    display_order: 16,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_107',
    account_code: '6107',
    account_name: '研修費',
    account_category: 'selling_admin',
    display_order: 17,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_108',
    account_code: '6108',
    account_name: '福利厚生費',
    account_category: 'selling_admin',
    display_order: 18,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_109',
    account_code: '6109',
    account_name: '会議費',
    account_category: 'selling_admin',
    display_order: 19,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_110',
    account_code: '6110',
    account_name: '接待交際費',
    account_category: 'selling_admin',
    display_order: 20,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_111',
    account_code: '6111',
    account_name: '消耗品費',
    account_category: 'selling_admin',
    display_order: 21,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_112',
    account_code: '6112',
    account_name: '保険料',
    account_category: 'selling_admin',
    display_order: 22,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_113',
    account_code: '6113',
    account_name: '業務委託費',
    account_category: 'selling_admin',
    display_order: 23,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_114',
    account_code: '6114',
    account_name: '水道光熱費',
    account_category: 'selling_admin',
    display_order: 24,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    account_id: 'acc_115',
    account_code: '6115',
    account_name: '法務・税務顧問料',
    account_category: 'selling_admin',
    display_order: 25,
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
];

// 取引先マスタ
export const mockVendors: Vendor[] = [
  {
    vendor_id: 'vnd_001',
    vendor_code: 'V001',
    vendor_name: '株式会社システム開発パートナー',
    freee_aux_account_name: 'システム開発パートナー',
    contact_name: '田中 太郎',
    email: 'tanaka@dev-partner.co.jp',
    phone: '03-1234-5678',
    address: {
      zipcode: '100-0001',
      prefecture_name: '東京都',
      street_name1: '千代田区丸の内1-1-1',
      street_name2: 'ビジネスタワー10F'
    },
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_002',
    vendor_code: 'V002',
    vendor_name: 'クラウドサービス株式会社',
    freee_aux_account_name: 'クラウドサービス',
    contact_name: '佐藤 花子',
    email: 'sato@cloud-service.co.jp',
    phone: '03-2345-6789',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_003',
    vendor_code: 'V003',
    vendor_name: '東京不動産管理',
    freee_aux_account_name: '東京不動産管理',
    contact_name: '鈴木 一郎',
    email: 'suzuki@tokyo-estate.co.jp',
    phone: '03-3456-7890',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_004',
    vendor_code: 'V004',
    vendor_name: 'NTTコミュニケーションズ',
    freee_aux_account_name: 'NTTコミュニケーションズ',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_005',
    vendor_code: 'V005',
    vendor_name: '株式会社広告エージェンシー',
    freee_aux_account_name: '広告エージェンシー',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_006',
    vendor_code: 'V006',
    vendor_name: '人材紹介サービス',
    freee_aux_account_name: '人材紹介サービス',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_007',
    vendor_code: 'V007',
    vendor_name: '研修プロバイダー',
    freee_aux_account_name: '研修プロバイダー',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_008',
    vendor_code: 'V008',
    vendor_name: '東京電力エナジーパートナー',
    freee_aux_account_name: '東京電力',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_009',
    vendor_code: 'V009',
    vendor_name: '三井住友海上火災保険',
    freee_aux_account_name: '三井住友海上',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_010',
    vendor_code: 'V010',
    vendor_name: '税理士法人アドバイザリー',
    freee_aux_account_name: '税理士法人アドバイザリー',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_011',
    vendor_code: 'V011',
    vendor_name: 'オフィス用品サプライ',
    freee_aux_account_name: 'オフィス用品サプライ',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    vendor_id: 'vnd_012',
    vendor_code: 'V012',
    vendor_name: '会計ソフトウェア株式会社',
    freee_aux_account_name: '会計ソフトウェア',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
];

// 変動要因マスタ
export const mockFluctuationFactors: FluctuationFactor[] = [
  {
    factor_id: 'fact_001',
    factor_name: '社員数',
    unit: '人',
    description: '月末時点の正社員数（業務委託含まず）',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    factor_id: 'fact_002',
    factor_name: '売上高',
    unit: '円',
    description: '月次売上高（税抜）',
    is_active: true,
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
];

// ユーザーマスタ
export const mockUsers: User[] = [
  {
    user_id: 'user_001',
    username: 'cfo_user',
    full_name: '田中 CFO',
    email: 'cfo@company.co.jp',
    role_id: 'role_001',
    last_login_at: new Date('2024-06-01T09:00:00Z'),
    is_active: true,
    password_hash: 'hashed_password_1',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-06-01'),
  },
  {
    user_id: 'user_002',
    username: 'accounting_user',
    full_name: '佐藤 経理',
    email: 'accounting@company.co.jp',
    role_id: 'role_002',
    last_login_at: new Date('2024-06-05T08:30:00Z'),
    is_active: true,
    password_hash: 'hashed_password_2',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-06-05'),
  },
];

// 役割マスタ
export const mockRoles: Role[] = [
  {
    role_id: 'role_001',
    role_name: 'CFO',
    description: '最高財務責任者',
    permissions: [
      {
        permission_id: 'perm_001',
        function_name: 'budget_confirm',
        function_description: '予算確定',
        can_read: true,
        can_write: true,
        can_delete: true,
      },
      {
        permission_id: 'perm_002',
        function_name: 'analysis_view',
        function_description: '分析レポート閲覧',
        can_read: true,
        can_write: true,
        can_delete: false,
      },
      {
        permission_id: 'perm_003',
        function_name: 'master_user',
        function_description: 'ユーザー管理',
        can_read: true,
        can_write: true,
        can_delete: true,
      },
    ],
  },
  {
    role_id: 'role_002',
    role_name: '経理担当',
    description: '経理担当者',
    permissions: [
      {
        permission_id: 'perm_004',
        function_name: 'budget_create',
        function_description: '予算作成',
        can_read: true,
        can_write: true,
        can_delete: false,
      },
      {
        permission_id: 'perm_005',
        function_name: 'actual_import',
        function_description: '実績インポート',
        can_read: true,
        can_write: true,
        can_delete: false,
      },
      {
        permission_id: 'perm_006',
        function_name: 'master_account',
        function_description: '勘定科目管理',
        can_read: true,
        can_write: true,
        can_delete: false,
      },
    ],
  },
];

// 便利なヘルパー関数
export const getAccountById = (id: string): Account | undefined => {
  return mockAccounts.find(account => account.account_id === id);
};

export const getAccountsByCategory = (category: 'cost_of_sales' | 'selling_admin'): Account[] => {
  return mockAccounts.filter(account => account.account_category === category);
};

export const getVendorById = (id: string): Vendor | undefined => {
  return mockVendors.find(vendor => vendor.vendor_id === id);
};

export const getActiveVendors = (): Vendor[] => {
  return mockVendors.filter(vendor => vendor.is_active);
};

export const getFactorById = (id: string): FluctuationFactor | undefined => {
  return mockFluctuationFactors.find(factor => factor.factor_id === id);
};