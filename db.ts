
import { Dexie, Table } from 'dexie';
import { InventoryItem, Transaction, Person, CashLog } from './types';

// Using named import { Dexie } ensures proper inheritance and type recognition in strict environments.
export class IndustrialDB extends Dexie {
  inventory!: Table<InventoryItem>;
  transactions!: Table<Transaction>;
  people!: Table<Person>;
  cashLogs!: Table<CashLog>;

  constructor() {
    // Initialize Dexie with the database name.
    super('ZapataIndustrialDB');
    
    // Define the database schema. version() is inherited from the Dexie base class.
    this.version(1).stores({
      inventory: '++id, name, category',
      transactions: '++id, type, itemId, personId, timestamp, synced',
      people: '++id, name, role, pin',
      cashLogs: '++id, timestamp'
    });
  }
}

export const db = new IndustrialDB();

// Seed initial data if empty
export async function seedDatabase() {
  const peopleCount = await db.people.count();
  if (peopleCount === 0) {
    await db.people.bulkAdd([
      { name: 'Admin Principal', role: 'OPERADOR', pin: '1234' },
      { name: 'Aceros del Norte', role: 'PROVEEDOR' },
      { name: 'Reciclajes Global', role: 'CLIENTE' }
    ]);
    await db.inventory.bulkAdd([
      { name: 'Cobre Brillante', category: 'Metales', unit: 'kg', pricePerUnit: 145.50 },
      { name: 'Aluminio Perfil', category: 'Metales', unit: 'kg', pricePerUnit: 32.00 },
      { name: 'Bronce Mixto', category: 'Metales', unit: 'kg', pricePerUnit: 88.20 }
    ]);
  }
}
