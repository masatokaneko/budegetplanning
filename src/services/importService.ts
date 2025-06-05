import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Budget, Actual } from '@/types/budget';
import { logger } from '@/lib/logger';
import { monitorPerformance } from '@/lib/performance';

export interface ImportError {
  row: number;
  message: string;
}

export interface ImportWarning {
  row: number;
  message: string;
}

export interface ImportResult {
  success: boolean;
  totalRecords: number;
  importedRecords: number;
  errors: ImportError[];
  warnings: ImportWarning[];
}

interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
  required: boolean;
  type: 'string' | 'number' | 'date';
}

const BUDGET_COLUMN_MAPPINGS: ColumnMapping[] = [
  { sourceColumn: '勘定科目コード', targetField: 'account_code', required: true, type: 'string' },
  { sourceColumn: '勘定科目名', targetField: 'account_name', required: true, type: 'string' },
  { sourceColumn: '勘定科目種別', targetField: 'account_type', required: true, type: 'string' },
  { sourceColumn: '取引先コード', targetField: 'vendor_code', required: false, type: 'string' },
  { sourceColumn: '取引先名', targetField: 'vendor_name', required: false, type: 'string' },
  { sourceColumn: '年月', targetField: 'year_month', required: true, type: 'date' },
  { sourceColumn: '金額', targetField: 'amount', required: true, type: 'number' },
  { sourceColumn: 'バージョン', targetField: 'version', required: true, type: 'string' },
  { sourceColumn: '計算方法', targetField: 'calculation_type', required: true, type: 'string' },
  { sourceColumn: '変動要因コード', targetField: 'linked_factor_code', required: false, type: 'string' },
  { sourceColumn: '基準値', targetField: 'basis_value', required: false, type: 'number' }
];

const ACTUAL_COLUMN_MAPPINGS: ColumnMapping[] = [
  { sourceColumn: '勘定科目コード', targetField: 'account_code', required: true, type: 'string' },
  { sourceColumn: '勘定科目名', targetField: 'account_name', required: true, type: 'string' },
  { sourceColumn: '勘定科目種別', targetField: 'account_type', required: true, type: 'string' },
  { sourceColumn: '取引先コード', targetField: 'vendor_code', required: false, type: 'string' },
  { sourceColumn: '取引先名', targetField: 'vendor_name', required: false, type: 'string' },
  { sourceColumn: '取引日', targetField: 'transaction_date', required: true, type: 'date' },
  { sourceColumn: '年月', targetField: 'year_month', required: true, type: 'date' },
  { sourceColumn: '金額', targetField: 'amount', required: true, type: 'number' },
  { sourceColumn: '摘要', targetField: 'description', required: false, type: 'string' }
];

export class ImportService {
  private async readExcelFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }

  private async readCsvFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => resolve(results.data),
        error: (error) => reject(error)
      });
    });
  }

  private validateData(data: any[], mappings: ColumnMapping[]): { errors: ImportError[], warnings: ImportWarning[] } {
    const errors: ImportError[] = [];
    const warnings: ImportWarning[] = [];

    data.forEach((row, index) => {
      mappings.forEach(mapping => {
        const value = row[mapping.sourceColumn];

        if (mapping.required && !value) {
          errors.push({
            row: index + 2, // Excelの行番号は1から始まり、ヘッダー行があるため+2
            message: `${mapping.sourceColumn}は必須項目です`
          });
          return;
        }

        if (value) {
          switch (mapping.type) {
            case 'number':
              if (isNaN(Number(value))) {
                errors.push({
                  row: index + 2,
                  message: `${mapping.sourceColumn}は数値で入力してください`
                });
              }
              break;
            case 'date':
              if (isNaN(Date.parse(value))) {
                errors.push({
                  row: index + 2,
                  message: `${mapping.sourceColumn}は日付形式で入力してください`
                });
              }
              break;
          }
        }
      });
    });

    return { errors, warnings };
  }

  private transformData(data: any[], mappings: ColumnMapping[]): any[] {
    return data.map(row => {
      const transformed: any = {};
      mappings.forEach(mapping => {
        const value = row[mapping.sourceColumn];
        if (value !== undefined) {
          switch (mapping.type) {
            case 'number':
              transformed[mapping.targetField] = Number(value);
              break;
            case 'date':
              transformed[mapping.targetField] = new Date(value).toISOString().split('T')[0];
              break;
            default:
              transformed[mapping.targetField] = value;
          }
        }
      });
      return transformed;
    });
  }

  public async importBudget(file: File): Promise<ImportResult> {
    try {
      const data = file.name.endsWith('.csv')
        ? await this.readCsvFile(file)
        : await this.readExcelFile(file);

      const { errors, warnings } = this.validateData(data, BUDGET_COLUMN_MAPPINGS);
      if (errors.length > 0) {
        return {
          success: false,
          totalRecords: data.length,
          importedRecords: 0,
          errors,
          warnings
        };
      }

      const transformedData = this.transformData(data, BUDGET_COLUMN_MAPPINGS);
      // TODO: データベースへの保存処理を実装

      return {
        success: true,
        totalRecords: data.length,
        importedRecords: transformedData.length,
        errors: [],
        warnings
      };
    } catch (error) {
      logger.error('Budget import failed', { error });
      throw error;
    }
  }

  public async importActual(file: File): Promise<ImportResult> {
    try {
      const data = file.name.endsWith('.csv')
        ? await this.readCsvFile(file)
        : await this.readExcelFile(file);

      const { errors, warnings } = this.validateData(data, ACTUAL_COLUMN_MAPPINGS);
      if (errors.length > 0) {
        return {
          success: false,
          totalRecords: data.length,
          importedRecords: 0,
          errors,
          warnings
        };
      }

      const transformedData = this.transformData(data, ACTUAL_COLUMN_MAPPINGS);
      // TODO: データベースへの保存処理を実装

      return {
        success: true,
        totalRecords: data.length,
        importedRecords: transformedData.length,
        errors: [],
        warnings
      };
    } catch (error) {
      logger.error('Actual import failed', { error });
      throw error;
    }
  }
} 