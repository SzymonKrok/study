import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Role } from 'database';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto, teacherId: string) {
    return this.prisma.attendance.create({
      data: {
        ...createAttendanceDto,
        date: new Date(createAttendanceDto.date),
        teacherId,
      },
      include: {
        student: { select: { firstName: true, lastName: true } },
        schedule: { include: { subject: true } },
      },
    });
  }

  async findAll(userRole: Role, userId: string, studentId?: string, date?: string) {
    const where: any = { deletedAt: null };

    if (studentId) where.studentId = studentId;
    if (date) where.date = { gte: new Date(date) };

    if (userRole === 'STUDENT') {
      const student = await this.prisma.student.findFirst({ where: { userId } });
      where.studentId = student?.id;
    }

    return this.prisma.attendance.findMany({
      where,
      include: {
        student: { select: { firstName: true, lastName: true } },
        schedule: { include: { subject: true, teacher: true } },
      },
      orderBy: { date: 'desc' },
      take: 100,
    });
  }

  async getStats(studentId: string) {
    const attendance = await this.prisma.attendance.findMany({
      where: { studentId, deletedAt: null },
    });

    const stats = {
      total: attendance.length,
      present: attendance.filter((a) => a.status === 'PRESENT').length,
      absent: attendance.filter((a) => a.status === 'ABSENT_UNEXCUSED' || a.status === 'ABSENT_EXCUSED').length,
      late: attendance.filter((a) => a.status === 'LATE').length,
    };

    return {
      ...stats,
      attendanceRate: stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(2) + '%' : '0%',
    };
  }
}

