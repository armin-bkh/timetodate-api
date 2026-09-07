import { db } from './db';

export async function initDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS dates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guestName TEXT NOT NULL DEFAULT 'unknown',
      datetime TEXT NOT NULL,
      activity TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      message TEXT,
      createdAt TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
}
