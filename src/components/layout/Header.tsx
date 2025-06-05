import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              費用予算管理システム
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              ヘルプ
            </Button>
            <Button variant="ghost" size="sm">
              設定
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <Button variant="ghost" size="sm">
              ログアウト
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}; 