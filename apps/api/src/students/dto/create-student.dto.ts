import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Jan' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Kowalski' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '2008-05-15' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: '+48 123 456 789', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'ul. Kwiatowa 123', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '12345678901', required: false })
  @IsString()
  @IsOptional()
  pesel?: string;

  @ApiProperty({ example: 'classId123', required: false })
  @IsString()
  @IsOptional()
  classId?: string;
}

