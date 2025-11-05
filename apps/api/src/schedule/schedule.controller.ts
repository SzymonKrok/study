import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Schedule')
@Controller('schedule')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz plan lekcji' })
  findAll(@CurrentUser() user: any, @Query('classId') classId?: string) {
    return this.scheduleService.findAll(user.role, user.id, classId);
  }

  @Get('class/:classId')
  @ApiOperation({ summary: 'Pobierz plan lekcji dla klasy' })
  findByClass(@Param('classId') classId: string) {
    return this.scheduleService.findByClass(classId);
  }
}

