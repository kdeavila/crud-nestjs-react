import { IsString, IsOptional, Length, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class CreateTaskDto {
  @ApiProperty({ description: 'Título breve de la tarea', minLength: 1, maxLength: 100 })
  @IsString()
  @Length(1, 100)
  title: string;

  @ApiPropertyOptional({ description: 'Descripción detallada', maxLength: 500 })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @ApiPropertyOptional({ enum: Status, default: Status.TODO })
  @IsOptional()
  @IsEnum(Status)
  status?: Status = Status.TODO;

  @ApiPropertyOptional({ enum: Priority, default: Priority.MEDIUM })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority = Priority.MEDIUM;

  @ApiPropertyOptional({ description: 'Fecha límite ISO 8601', type: String, example: '2025-10-31T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string | null;
}
