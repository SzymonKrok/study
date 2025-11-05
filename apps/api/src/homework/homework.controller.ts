import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from 'database';

@ApiTags('Homework')
@Controller('homework')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Dodaj zadanie domowe (ADMIN, TEACHER)' })
  async create(@Body() createHomeworkDto: CreateHomeworkDto, @CurrentUser() user: any) {
    const teacher = await this.homeworkService['prisma'].teacher.findFirst({
      where: { userId: user.id },
    });
    return this.homeworkService.create(createHomeworkDto, teacher!.id);
  }

  @Get()
  @ApiOperation({ summary: 'Pobierz listę zadań domowych' })
  findAll(@CurrentUser() user: any, @Query('classId') classId?: string) {
    return this.homeworkService.findAll(user.role, user.id, classId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły zadania domowego' })
  findOne(@Param('id') id: string) {
    return this.homeworkService.findOne(id);
  }

  @Post(':id/submit')
  @Roles(Role.STUDENT)
  @ApiOperation({ summary: 'Wyślij rozwiązanie zadania (STUDENT)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async submitHomework(
    @Param('id') id: string,
    @Body('content') content: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    const student = await this.homeworkService['prisma'].student.findFirst({
      where: { userId: user.id },
    });
    
    // W produkcji: uploaduj plik do S3/Cloudinary
    const attachmentUrl = file ? `/uploads/${file.filename}` : undefined;

    return this.homeworkService.submitHomework(id, student!.id, content, attachmentUrl);
  }

  @Get(':id/submissions')
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Pobierz rozwiązania zadania (ADMIN, TEACHER)' })
  getSubmissions(@Param('id') id: string) {
    return this.homeworkService.getSubmissions(id);
  }
}

