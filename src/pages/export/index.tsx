import React from 'react';
import { Container, Typography } from '@mui/material';
import { ExportForm } from '@/components/export/ExportForm';
import { useBudgets } from '@/hooks/useBudgets';
import { useActuals } from '@/hooks/useActuals';
import { logger } from '@/lib/logger';

const ExportPage: React.FC = () => {
  const { budgets } = useBudgets();
  const { actuals } = useActuals();

  const handleExport = (blob: Blob, fileName: string) => {
    try {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      logger.info('File downloaded', { fileName });
    } catch (error) {
      logger.error('Download failed', { error });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        レポート出力
      </Typography>

      <ExportForm
        onExport={handleExport}
        budgets={budgets}
        actuals={actuals}
      />
    </Container>
  );
};

export default ExportPage; 