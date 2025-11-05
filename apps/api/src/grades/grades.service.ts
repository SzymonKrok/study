import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { Role } from 'database';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async create(createGradeDto: CreateGradeDto, teacherId: string) {
    return this.prisma.grade.create({
      data: {
        ...createGradeDto,
        teacherId,
      },
      include: {
        student: { select: { id: true, firstName: true, lastName: true } },
        subject: true,
        category: true,
      },
    });
  }

  async findAll(userRole: Role, userId: string, studentId?: string, subjectId?: string) {
    const where: any = { deletedAt: null };

    if (studentId) where.studentId = studentId;
    if (subjectId) where.subjectId = subjectId;

    // Role-based filtering
    if (userRole === 'STUDENT') {
      const student = await this.prisma.student.findFirst({ where: { userId } });
      where.studentId = student?.id;
    } else if (userRole === 'TEACHER') {
      const teacher = await this.prisma.teacher.findFirst({ where: { userId } });
      where.teacherId = teacher?.id;
    }

    return this.prisma.grade.findMany({
      where,
      include: {
        student: { select: { firstName: true, lastName: true } },
        subject: true,
        teacher: { select: { firstName: true, lastName: true, title: true } },
        category: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async remove(id: string, userRole: Role, userId: string) {
    const grade = await this.prisma.grade.findUnique({ where: { id } });
    
    if (userRole === 'TEACHER') {
      const teacher = await this.prisma.teacher.findFirst({ where: { userId } });
      if (grade?.teacherId !== teacher?.id) {
        throw new ForbiddenException('You can only delete your own grades');
      }
    }

    return this.prisma.grade.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

