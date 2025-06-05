import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ユーザーの作成
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: '管理者',
      role: 'admin',
    },
  });

  // 勘定科目の作成
  const accounts = await Promise.all([
    prisma.account.create({
      data: {
        code: 'ACC001',
        name: '外注費',
        type: 'cost_of_sales',
        category: '開発費',
        description: 'システム開発のための外注費用',
        created_by: adminUser.id,
      },
    }),
    prisma.account.create({
      data: {
        code: 'ACC002',
        name: 'ソフトウェア減価償却費',
        type: 'cost_of_sales',
        category: '減価償却費',
        description: 'ソフトウェアの減価償却費用',
        created_by: adminUser.id,
      },
    }),
    prisma.account.create({
      data: {
        code: 'ACC101',
        name: '情報システム利用料',
        type: 'selling_admin',
        category: 'システム利用料',
        description: 'クラウドサービス等の利用料',
        created_by: adminUser.id,
      },
    }),
  ]);

  // 取引先の作成
  const vendors = await Promise.all([
    prisma.vendor.create({
      data: {
        code: 'VND001',
        name: '株式会社A',
        type: 'system_development',
        description: 'システム開発会社',
        created_by: adminUser.id,
      },
    }),
    prisma.vendor.create({
      data: {
        code: 'VND002',
        name: '株式会社B',
        type: 'cloud_service',
        description: 'クラウドサービス提供会社',
        created_by: adminUser.id,
      },
    }),
  ]);

  // 変動要因の作成
  const factors = await Promise.all([
    prisma.fluctuationFactor.create({
      data: {
        code: 'FACT001',
        name: '社員数',
        type: 'headcount',
        description: '従業員数の変動',
        created_by: adminUser.id,
      },
    }),
  ]);

  // 予算の作成（例：2024年4月分）
  const budgets = await Promise.all([
    prisma.budget.create({
      data: {
        account_id: accounts[0].id,
        vendor_id: vendors[0].id,
        year_month: '202404',
        amount: 800000,
        version: 'ver_001',
        calculation_type: 'manual',
        created_by: adminUser.id,
      },
    }),
    prisma.budget.create({
      data: {
        account_id: accounts[1].id,
        year_month: '202404',
        amount: 250000,
        version: 'ver_001',
        calculation_type: 'manual',
        created_by: adminUser.id,
      },
    }),
    prisma.budget.create({
      data: {
        account_id: accounts[2].id,
        vendor_id: vendors[1].id,
        year_month: '202404',
        amount: 675000,
        version: 'ver_001',
        calculation_type: 'factor_linked',
        linked_factor_id: factors[0].id,
        basis_value: 15000,
        created_by: adminUser.id,
      },
    }),
  ]);

  // 実績の作成（例：2024年4月分）
  const actuals = await Promise.all([
    prisma.actual.create({
      data: {
        account_id: accounts[0].id,
        vendor_id: vendors[0].id,
        transaction_date: new Date('2024-04-15'),
        year_month: '202404',
        amount: 820000,
        description: '4月分外注費',
        source_file: 'import_202404.csv',
        imported_at: new Date(),
        created_by: adminUser.id,
      },
    }),
    prisma.actual.create({
      data: {
        account_id: accounts[1].id,
        transaction_date: new Date('2024-04-01'),
        year_month: '202404',
        amount: 250000,
        description: '4月分減価償却費',
        source_file: 'import_202404.csv',
        imported_at: new Date(),
        created_by: adminUser.id,
      },
    }),
    prisma.actual.create({
      data: {
        account_id: accounts[2].id,
        vendor_id: vendors[1].id,
        transaction_date: new Date('2024-04-01'),
        year_month: '202404',
        amount: 680000,
        description: '4月分システム利用料',
        source_file: 'import_202404.csv',
        imported_at: new Date(),
        created_by: adminUser.id,
      },
    }),
  ]);

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 