import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { logger } from '@/lib/logger';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize?: number;
  loading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB
  loading = false
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const file = acceptedFiles[0];
    
    if (!file) {
      setError('ファイルが選択されていません');
      return;
    }

    if (file.size > maxSize) {
      setError(`ファイルサイズが大きすぎます（最大${maxSize / 1024 / 1024}MB）`);
      return;
    }

    try {
      onFileSelect(file);
      logger.info('File selected', { fileName: file.name, fileSize: file.size });
    } catch (err) {
      setError('ファイルの処理中にエラーが発生しました');
      logger.error('Failed to process file', { error: err });
    }
  }, [onFileSelect, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: false
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        '&:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={40} />
          <Typography>ファイルを処理中...</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6">
            {isDragActive ? 'ファイルをドロップ' : 'ファイルをドラッグ＆ドロップ'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            またはクリックしてファイルを選択
          </Typography>
          <Typography variant="caption" color="text.secondary">
            対応フォーマット: {accept}
          </Typography>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
}; 