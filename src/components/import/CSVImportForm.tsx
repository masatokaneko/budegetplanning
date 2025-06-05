import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface CSVImportFormProps {
  onFileSelect: (file: File) => void;
  onImport: () => void;
  isImporting: boolean;
  error?: string;
}

export const CSVImportForm: React.FC<CSVImportFormProps> = ({
  onFileSelect,
  onImport,
  isImporting,
  error
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CSVファイルを選択
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        {selectedFile && (
          <div className="text-sm text-gray-500">
            選択されたファイル: {selectedFile.name}
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          onClick={onImport}
          disabled={!selectedFile || isImporting}
          variant="default"
        >
          {isImporting ? 'インポート中...' : 'インポート開始'}
        </Button>
      </div>
    </Card>
  );
}; 