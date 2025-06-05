import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { FileUpload } from '@/components/import/FileUpload';
import { ImportResult } from '@/components/import/ImportResult';
import { ImportService } from '@/services/importService';
import { logger } from '@/lib/logger';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`import-tabpanel-${index}`}
      aria-labelledby={`import-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ImportPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setResult(null);
  };

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setResult(null);

    try {
      const importService = new ImportService();
      const importResult = tabValue === 0
        ? await importService.importBudget(file)
        : await importService.importActual(file);

      setResult(importResult);
      logger.info('Import completed', { result: importResult });
    } catch (error) {
      logger.error('Import failed', { error });
      setResult({
        success: false,
        totalRecords: 0,
        importedRecords: 0,
        errors: [{ row: 0, message: 'インポート処理中にエラーが発生しました' }],
        warnings: []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        データインポート
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="import tabs"
        >
          <Tab label="予算データ" />
          <Tab label="実績データ" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <FileUpload
            onFileSelect={handleFileSelect}
            accept=".xlsx,.xls,.csv"
            loading={loading}
          />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FileUpload
            onFileSelect={handleFileSelect}
            accept=".xlsx,.xls,.csv"
            loading={loading}
          />
        </TabPanel>
      </Paper>

      {result && <ImportResult result={result} />}
    </Container>
  );
};

export default ImportPage; 