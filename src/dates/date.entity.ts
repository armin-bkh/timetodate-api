import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('dates')
export class DateRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'unknown' })
  guestName: string;

  @Column()
  datetime: string;

  @Column()
  activity: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
