import { openDB, type IDBPDatabase } from 'idb'
import type { AppDB } from '@/shared/types'

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
