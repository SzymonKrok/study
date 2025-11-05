import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from 'database';

@ApiTags('Attendance')
@Controller('attendance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Dodaj obecność (ADMIN, TEACHER)' })
  async create(@Body() createAttendanceDto: CreateAttendanceDto, @CurrentUser() user: any) {
    const teacher = await this.attendanceService['prisma'].teacher.findFirst({
      where: { userId: user.id },
    });
    return this.attendanceService.create(createAttendanceDto, teacher!.id);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę obecności' })
  findAll(
    @CurrentUser() user: any,
    @Query('studentId') studentId?: string,
    @Query('date') date?: string,
  ) {
    return this.attendanceService.findAll(user.role, user.id, studentId, date);
  }

  @Get('stats/:studentId')
  @ApiOperation({ summary: 'Pobierz statystyki obecności ucznia' })
  getStats(@Param('studentId') studentId: string) {
    return this.attendanceService.getStats(studentId);
  }
}

