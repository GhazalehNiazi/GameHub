import { openDB, type DBSchema, type IDBPDatabase } from 'idb'

/**
 * Define your IndexedDB schema here.
 * Add stores as your app grows.
 */
interface AppDB extends DBSchema {
  drafts: {
    key: string
    value: { id: string; content: string; updatedAt: number }
  }
}

let _db: IDBPDatabase<AppDB> | null = null

export async function getDb(): Promise<IDBPDatabase<AppDB>> {
  if (!_db) {
    _db = await openDB<AppDB>('app-db', 1, {
      upgrade(db) {
        db.createObjectStore('drafts', { keyPath: 'id' })
      },
    })
  }
  return _db
}
