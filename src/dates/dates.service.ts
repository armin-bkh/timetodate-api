import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../db';
import { CreateDateDto, UpdateDateDto } from './dto';

@Injectable()
export class DatesService {
  async create(dto: CreateDateDto) {
    const guestName = dto.guestName || 'unknown';
    const result = await db.execute({
      sql: `INSERT INTO dates (guestName, datetime, activity, message) VALUES (?, ?, ?, ?)`,
      args: [guestName, dto.datetime, dto.activity, dto.message || null],
    });
    return this.findOne(Number(result.lastInsertRowid));
  }

  async findAll() {
    const result = await db.execute(`SELECT * FROM dates ORDER BY createdAt DESC`);
    return result.rows;
  }

  async findOne(id: number) {
    const result = await db.execute({
      sql: `SELECT * FROM dates WHERE id = ?`,
      args: [id],
    });
    if (result.rows.length === 0) {
      throw new NotFoundException(`Date request #${id} not found`);
    }
    return result.rows[0];
  }

  async update(id: number, dto: UpdateDateDto) {
    await this.findOne(id);
    const fields: string[] = [];
    const args: any[] = [];
    if (dto.status !== undefined) { fields.push('status = ?'); args.push(dto.status); }
    if (dto.message !== undefined) { fields.push('message = ?'); args.push(dto.message); }
    if (fields.length === 0) return this.findOne(id);
    args.push(id);
    await db.execute({ sql: `UPDATE dates SET ${fields.join(', ')} WHERE id = ?`, args });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await db.execute({ sql: `DELETE FROM dates WHERE id = ?`, args: [id] });
  }
}
