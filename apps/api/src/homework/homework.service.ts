import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { Role } from 'database';

@Injectable()
export class HomeworkService {
  constructor(private prisma: PrismaService) {}

  async create(createHomeworkDto: CreateHomeworkDto, teacherId: string) {
    return this.prisma.homework.create({
      data: {
        ...createHomeworkDto,
        dueDate: new Date(createHomeworkDto.dueDate),
        teacherId,
      },
      include: {
        class: true,
        subject: true,
        teacher: { select: { firstName: true, lastName: true, title: true } },
      },
    });
  }

  async findAll(userRole: Role, userId: string, classId?: string) {
    const where: any = { deletedAt: null };

    if (classId) where.classId = classId;

    if (userRole === 'STUDENT') {
      const student = await this.prisma.student.findFirst({
        where: { userId },
        select: { classId: true },
      });
      where.classId = student?.classId;
    } else if (userRole === 'TEACHER') {
      const teacher = await this.prisma.teacher.findFirst({ where: { userId } });
      where.teacherId = teacher?.id;
    }

    return this.prisma.homework.findMany({
      where,
      include: {
        class: { select: { name: true } },
        subject: { select: { name: true } },
        teacher: { select: { firstName: true, lastName: true } },
        _count: { select: { submissions: true } },
      },
      orderBy: { dueDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const homework = await this.prisma.homework.findFirst({
      where: { id, deletedAt: null },
      include: {
        class: true,
        subject: true,
        teacher: true,
        submissions: {
          include: {
            student: { select: { firstName: true, lastName: true } },
          },
        },
      },
    });
    if (!homework) throw new NotFoundException('Homework not found');
    return homework;
  }

  async submitHomework(homeworkId: string, studentId: string, content: string, attachmentUrl?: string) {
    return this.prisma.homeworkSubmission.create({
      data: {
        homeworkId,
        studentId,
        content,
        attachmentUrl,
        submittedAt: new Date(),
      },
      include: {
        homework: true,
        student: { select: { firstName: true, lastName: true } },
      },
    });
  }

  async getSubmissions(homeworkId: string) {
    return this.prisma.homeworkSubmission.findMany({
      where: { homeworkId },
      include: {
        student: { select: { firstName: true, lastName: true } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  }
}

