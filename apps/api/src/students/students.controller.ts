import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from 'database';

@ApiTags('Students')
@Controller('students')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Dodaj nowego ucznia (tylko ADMIN)' })
  @ApiResponse({ status: 201, description: 'Uczeń został utworzony' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień' })
  create(@Body() createStudentDto: CreateStudentDto, @CurrentUser() user: any) {
    return this.studentsService.create(createStudentDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę uczniów' })
  @ApiResponse({ status: 200, description: 'Lista uczniów z paginacją' })
  findAll(@Query() query: QueryStudentsDto, @CurrentUser() user: any) {
    return this.studentsService.findAll(query, user.role, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły ucznia' })
  @ApiResponse({ status: 200, description: 'Szczegóły ucznia' })
  @ApiResponse({ status: 404, description: 'Uczeń nie znaleziony' })
  @ApiResponse({ status: 403, description: 'Brak dostępu' })
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.findOne(id, user.role, user.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Zaktualizuj dane ucznia (ADMIN, TEACHER)' })
  @ApiResponse({ status: 200, description: 'Dane ucznia zaktualizowane' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień' })
  @ApiResponse({ status: 404, description: 'Uczeń nie znaleziony' })
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @CurrentUser() user: any,
  ) {
    return this.studentsService.update(id, updateStudentDto, user.role, user.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Usuń ucznia (soft delete, tylko ADMIN)' })
  @ApiResponse({ status: 200, description: 'Uczeń został usunięty' })
  @ApiResponse({ status: 403, description: 'Brak uprawnień' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }

  @Get(':id/grades')
  @ApiOperation({ summary: 'Pobierz oceny ucznia' })
  @ApiResponse({ status: 200, description: 'Lista ocen ucznia' })
  @ApiResponse({ status: 403, description: 'Brak dostępu' })
  getGrades(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.getStudentGrades(id, user.role, user.id);
  }

  @Get(':id/attendance')
  @ApiOperation({ summary: 'Pobierz frekwencję ucznia' })
  @ApiResponse({ status: 200, description: 'Historia obecności ucznia' })
  @ApiResponse({ status: 403, description: 'Brak dostępu' })
  getAttendance(@Param('id') id: string, @CurrentUser() user: any) {
    return this.studentsService.getStudentAttendance(id, user.role, user.id);
  }
}

