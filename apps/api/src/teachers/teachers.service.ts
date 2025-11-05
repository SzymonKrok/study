import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    const [teachers, total] = await Promise.all([
      this.prisma.teacher.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        include: {
          user: { select: { id: true, username: true, email: true, role: true } },
          subjects: { include: { subject: true } },
          classTeacher: { select: { id: true, name: true } },
        },
        orderBy: { lastName: 'asc' },
      }),
      this.prisma.teacher.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: teachers,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: { select: { id: true, username: true, email: true } },
        subjects: { include: { subject: true } },
        classTeacher: true,
        grades: {
          take: 20,
          orderBy: { date: 'desc' },
          include: { student: true, subject: true },
        },
      },
    });

    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async remove(id: string) {
    return this.prisma.teacher.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

