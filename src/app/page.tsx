import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BudgetActualChart } from '@/components/charts/BudgetActualChart';
import { ProgressBar } from '@/components/charts/ProgressBar';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>予算達成率</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar value={75} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>今月の予算</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">¥1,500,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>今月の実績</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">¥1,125,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>予算差異</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">¥375,000</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>予算実績推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <BudgetActualChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 