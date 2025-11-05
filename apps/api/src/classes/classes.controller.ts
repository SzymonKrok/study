import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Classes')
@Controller('classes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę klas' })
  findAll() {
    return this.classesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły klasy' })
  findOne(@Param('id') id: string) {
    return this.classesService.findOne(id);
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Pobierz uczniów klasy' })
  async getStudents(@Param('id') id: string) {
    const classItem = await this.classesService.findOne(id);
    return classItem.students;
  }
}

