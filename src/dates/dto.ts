import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDateDto {
  @IsString()
  @IsOptional()
  guestName?: string;

  @IsString()
  @IsNotEmpty()
  datetime: string;

  @IsString()
  @IsNotEmpty()
  activity: string;

  @IsString()
  @IsOptional()
  message?: string;
}

export class UpdateDateDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  message?: string;
}
