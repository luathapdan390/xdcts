
export enum Category {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  ASSET = 'ASSET',
  LIABILITY = 'LIABILITY'
}

export interface FinancialItem {
  id: string;
  name: string;
  value: number;
  category: Category;
  icon?: string;
  description?: string;
  link?: string;
}

export interface CashFlowData {
  income: FinancialItem[];
  expenses: FinancialItem[];
  assets: FinancialItem[];
  liabilities: FinancialItem[];
}
