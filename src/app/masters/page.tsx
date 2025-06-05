import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

const masterItems = [
  {
    title: '勘定科目マスタ',
    description: '勘定科目の登録・編集・削除を行います',
    href: '/masters/accounts',
  },
  {
    title: '取引先マスタ',
    description: '取引先の登録・編集・削除を行います',
    href: '/masters/vendors',
  },
  {
    title: '変動要因マスタ',
    description: '変動要因の登録・編集・削除を行います',
    href: '/masters/factors',
  },
  {
    title: 'ユーザーマスタ',
    description: 'ユーザーの登録・編集・削除を行います',
    href: '/masters/users',
  },
];

export default function MastersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">マスタ管理</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {masterItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full hover:bg-gray-50 transition-colors">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 