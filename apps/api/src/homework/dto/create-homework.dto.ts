import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateHomeworkDto {
  @ApiProperty({ example: 'Rozwiązać zadania 1-10 ze str. 45' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Dokładny opis zadania domowego' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2025-11-12' })
  @IsDateString()
  dueDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  classId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  attachmentUrl?: string;
}

