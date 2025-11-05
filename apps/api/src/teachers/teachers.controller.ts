import { Controller, Get, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'database';

@ApiTags('Teachers')
@Controller('teachers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę nauczycieli' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.teachersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły nauczyciela' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Usuń nauczyciela (ADMIN)' })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}

