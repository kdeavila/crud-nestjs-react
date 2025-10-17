import { ApiProperty } from '@nestjs/swagger';

export class TaskResponseDto {
  @ApiProperty({ description: 'UUID of the task', example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;

  @ApiProperty({ description: 'Title', minLength: 1, maxLength: 100, example: 'Buy groceries' })
  title: string;

  @ApiProperty({ description: 'Description', example: 'Milk, eggs, bread', required: false })
  description?: string | null;

  @ApiProperty({ description: 'Status', example: 'TODO' })
  status: string;

  @ApiProperty({ description: 'Priority', example: 'MEDIUM' })
  priority: string;

  @ApiProperty({ description: 'Due date (ISO 8601)', example: '2025-10-31T00:00:00.000Z', required: false, type: String, nullable: true })
  dueDate?: string | null;

  @ApiProperty({ description: 'Creation timestamp', example: '2025-10-01T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2025-10-02T12:00:00.000Z' })
  updatedAt: Date;
}
