import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min, Max, IsInt, IsOptional, IsEnum } from 'class-validator';
import { GradeType } from 'database';

export class CreateGradeDto {
  @ApiProperty({ example: 5, minimum: 1, maximum: 6 })
  @IsNumber()
  @Min(1)
  @Max(6)
  value: number;

  @ApiProperty({ example: 1, description: 'Semestr (1 lub 2)' })
  @IsInt()
  @Min(1)
  @Max(2)
  semester: number;

  @ApiProperty({ example: 3, description: 'Waga oceny' })
  @IsNumber()
  @Min(0.5)
  weight: number;

  @ApiProperty({ example: 'studentId' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'subjectId' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 'categoryId', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 'Sprawdzian z trygonometrii', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: GradeType, example: 'PARTIAL' })
  @IsEnum(GradeType)
  type: GradeType;
}

