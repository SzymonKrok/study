import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from 'database';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.schedule.findMany({
      where,
      include: {
        subject: true,
        class: true,
        teacher: { select: { firstName: true, lastName: true, title: true } },
        classroom: true,
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async findByClass(classId: string) {
    return this.prisma.schedule.findMany({
      where: { classId, deletedAt: null },
      include: {
        subject: true,
        teacher: { select: { firstName: true, lastName: true, title: true } },
        classroom: true,
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }
}

