import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'database';

export class RegisterDto {
  @ApiProperty({
    example: 'jkowalski',
    description: 'Unikalna nazwa użytkownika',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'jan.kowalski@szkola.pl',
    description: 'Adres email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Hasło (minimum 6 znaków)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'STUDENT',
    enum: Role,
    description: 'Rola użytkownika',
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    example: 'Jan',
    description: 'Imię',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Kowalski',
    description: 'Nazwisko',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}

