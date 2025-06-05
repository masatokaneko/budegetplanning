import { Budget } from '../types';

interface ImportResult {
  success: boolean;
  data?: Budget[];
  errors?: {
    row: number;
    message: string;
  }[];
}

export const parseCSV = async (file: File): Promise<ImportResult> => {
  try {
    const text = await file.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const requiredHeaders = ['year', 'month', 'department', 'category', 'amount'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
      return {
        success: false,
        errors: [{
          row: 1,
          message: `必須のヘッダーが不足しています: ${missingHeaders.join(', ')}`
        }]
      };
    }

    const budgets: Budget[] = [];
    const errors: ImportResult['errors'] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      if (values.length !== headers.length) {
        errors.push({
          row: i + 1,
          message: '列数が一致しません'
        });
        continue;
      }

      try {
        const budget: Budget = {
          id: `temp-${i}`,
          year: parseInt(values[headers.indexOf('year')]),
          month: parseInt(values[headers.indexOf('month')]),
          department: values[headers.indexOf('department')],
          category: values[headers.indexOf('category')],
          amount: parseFloat(values[headers.indexOf('amount')]),
          status: 'draft',
          createdBy: 'system',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        // 基本的なバリデーション
        if (isNaN(budget.year) || budget.year < 2000 || budget.year > 2100) {
          throw new Error('無効な年です');
        }
        if (isNaN(budget.month) || budget.month < 1 || budget.month > 12) {
          throw new Error('無効な月です');
        }
        if (isNaN(budget.amount)) {
          throw new Error('無効な金額です');
        }

        budgets.push(budget);
      } catch (error) {
        errors.push({
          row: i + 1,
          message: error instanceof Error ? error.message : '不明なエラー'
        });
      }
    }

    return {
      success: errors.length === 0,
      data: budgets,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    return {
      success: false,
      errors: [{
        row: 0,
        message: error instanceof Error ? error.message : 'ファイルの読み込みに失敗しました'
      }]
    };
  }
}; 