import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.class.findMany({
      where: { deletedAt: null },
      include: {
        classTeacher: { select: { id: true, firstName: true, lastName: true, title: true } },
        _count: { select: { students: true } },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const classItem = await this.prisma.class.findFirst({
      where: { id, deletedAt: null },
      include: {
        classTeacher: true,
        students: {
          where: { deletedAt: null },
          include: { user: { select: { email: true, username: true } } },
        },
        subjects: { include: { subject: true } },
      },
    });
    if (!classItem) throw new NotFoundException('Class not found');
    return classItem;
  }
}

