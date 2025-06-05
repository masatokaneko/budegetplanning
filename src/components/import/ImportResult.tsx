import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  AlertTitle
} from '@mui/material';
import { ImportResult as ImportResultType } from '@/services/importService';

interface ImportResultProps {
  result: ImportResultType;
}

export const ImportResult: React.FC<ImportResultProps> = ({ result }) => {
  const { success, totalRecords, importedRecords, errors, warnings } = result;

  return (
    <Box sx={{ mt: 3 }}>
      <Alert severity={success ? 'success' : 'error'} sx={{ mb: 2 }}>
        <AlertTitle>
          {success ? 'インポート成功' : 'インポート失敗'}
        </AlertTitle>
        <Typography>
          処理レコード数: {totalRecords} / インポート成功: {importedRecords}
        </Typography>
      </Alert>

      {warnings.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>警告</AlertTitle>
          <Typography>
            {warnings.length}件の警告があります
          </Typography>
        </Alert>
      )}

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>エラー</AlertTitle>
          <Typography>
            {errors.length}件のエラーがあります
          </Typography>
        </Alert>
      )}

      {(errors.length > 0 || warnings.length > 0) && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>行番号</TableCell>
                <TableCell>種類</TableCell>
                <TableCell>メッセージ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {errors.map((error, index) => (
                <TableRow key={`error-${index}`}>
                  <TableCell>{error.row}</TableCell>
                  <TableCell>エラー</TableCell>
                  <TableCell>{error.message}</TableCell>
                </TableRow>
              ))}
              {warnings.map((warning, index) => (
                <TableRow key={`warning-${index}`}>
                  <TableCell>{warning.row}</TableCell>
                  <TableCell>警告</TableCell>
                  <TableCell>{warning.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}; 