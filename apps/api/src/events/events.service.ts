import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role, EventType } from 'database';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userRole: Role, userId: string, type?: EventType) {
    const where: any = { deletedAt: null };

    if (type) where.type = type;

    // Filtrowanie wydarzeń na podstawie roli
    if (userRole === 'STUDENT') {
      const student = await this.prisma.student.findFirst({
        where: { userId },
        select: { id: true, classId: true },
      });
      where.OR = [
        { type: 'SCHOOL_WIDE' },
        { type: 'CLASS', classId: student?.classId },
        { type: 'INDIVIDUAL', studentId: student?.id },
      ];
    } else if (userRole === 'TEACHER') {
      const teacher = await this.prisma.teacher.findFirst({
        where: { userId },
        include: { classTeacher: true },
      });
      const classIds = teacher?.classTeacher.map((c) => c.id) || [];
      where.OR = [
        { type: 'SCHOOL_WIDE' },
        { type: 'CLASS', classId: { in: classIds } },
      ];
    }

    return this.prisma.event.findMany({
      where,
      include: {
        class: { select: { name: true } },
        student: { select: { firstName: true, lastName: true } },
      },
      orderBy: { startDate: 'asc' },
      take: 50,
    });
  }

  async findUpcoming(userRole: Role, userId: string) {
    const now = new Date();
    const events = await this.findAll(userRole, userId);
    return events.filter((e) => new Date(e.startDate) >= now);
  }
}

