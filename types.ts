
export enum TransactionType {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA'
}

export interface InventoryItem {
  id?: number;
  name: string;
  category: string;
  unit: string;
  pricePerUnit: number;
}

export interface Transaction {
  id?: number;
  type: TransactionType;
  itemId: number;
  itemName: string;
  weight: number;
  total: number;
  personId: number;
  personName: string;
  timestamp: number;
  synced: boolean;
}

export interface Person {
  id?: number;
  name: string;
  role: 'PROVEEDOR' | 'CLIENTE' | 'OPERADOR';
  pin?: string;
}

export interface CashLog {
  id?: number;
  amount: number;
  description: string;
  type: 'INGRESO' | 'EGRESO';
  timestamp: number;
}

export interface AppState {
  isAuthenticated: boolean;
  currentUser: Person | null;
  syncStatus: 'idle' | 'syncing' | 'error';
  lastSync: number;
}
