import { Controller, Get, Post, Body, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from 'database';

@ApiTags('Grades')
@Controller('grades')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Dodaj ocenę (ADMIN, TEACHER)' })
  async create(@Body() createGradeDto: CreateGradeDto, @CurrentUser() user: any) {
    const teacher = await this.gradesService['prisma'].teacher.findFirst({
      where: { userId: user.id },
    });
    return this.gradesService.create(createGradeDto, teacher!.id);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę ocen' })
  findAll(
    @CurrentUser() user: any,
    @Query('studentId') studentId?: string,
    @Query('subjectId') subjectId?: string,
  ) {
    return this.gradesService.findAll(user.role, user.id, studentId, subjectId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Usuń ocenę (ADMIN, TEACHER)' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.gradesService.remove(id, user.role, user.id);
  }
}

