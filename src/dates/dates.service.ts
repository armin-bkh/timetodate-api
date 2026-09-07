import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateRequest } from './date.entity';
import { CreateDateDto, UpdateDateDto } from './dto';

@Injectable()
export class DatesService {
  constructor(
    @InjectRepository(DateRequest)
    private readonly dateRepo: Repository<DateRequest>,
  ) {}

  async create(dto: CreateDateDto): Promise<DateRequest> {
    const dateRequest = this.dateRepo.create(dto);
    return this.dateRepo.save(dateRequest);
  }

  async findAll(): Promise<DateRequest[]> {
    return this.dateRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<DateRequest> {
    const date = await this.dateRepo.findOne({ where: { id } });
    if (!date) throw new NotFoundException(`Date request #${id} not found`);
    return date;
  }

  async update(id: number, dto: UpdateDateDto): Promise<DateRequest> {
    const date = await this.findOne(id);
    Object.assign(date, dto);
    return this.dateRepo.save(date);
  }

  async remove(id: number): Promise<void> {
    const date = await this.findOne(id);
    await this.dateRepo.remove(date);
  }
}
