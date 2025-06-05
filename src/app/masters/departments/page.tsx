import React from 'react';
import { DataGrid } from '@/components/data-grid/DataGrid';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/Modal';

export default function DepartmentsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">部門管理</h1>
      <DataGrid />
    </div>
  );
} 