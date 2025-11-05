import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { EventType } from 'database';

@ApiTags('Events')
@Controller('events')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę wydarzeń' })
  @ApiQuery({ name: 'type', enum: EventType, required: false })
  findAll(@CurrentUser() user: any, @Query('type') type?: EventType) {
    return this.eventsService.findAll(user.role, user.id, type);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Pobierz nadchodzące wydarzenia' })
  findUpcoming(@CurrentUser() user: any) {
    return this.eventsService.findUpcoming(user.role, user.id);
  }
}

