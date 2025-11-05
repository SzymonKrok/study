import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { Role } from 'database';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto, userId: string) {
    // Generuj unikalny numer studenta
    const year = new Date().getFullYear();
    const count = await this.prisma.student.count();
    const studentNumber = `${year}${String(count + 1).padStart(3, '0')}`;

    return this.prisma.student.create({
      data: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
        studentNumber,
        dateOfBirth: new Date(createStudentDto.dateOfBirth),
        phone: createStudentDto.phone || '',
        address: createStudentDto.address,
        pesel: createStudentDto.pesel,
        classId: createStudentDto.classId,
        userId, // This will be provided from auth register
      },
      include: {
        user: true,
        class: true,
      },
    });
  }

  async findAll(query: QueryStudentsDto, userRole: Role, userId: string) {
    const { page = 1, limit = 20, classId, search } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    // Role-based filtering
    if (userRole === 'STUDENT') {
      // Uczeń widzi tylko siebie
      const student = await this.prisma.student.findFirst({
        where: { userId },
      });
      where.id = student?.id;
    } else if (userRole === 'PARENT') {
      // Rodzic widzi tylko swoje dzieci
      const parent = await this.prisma.parent.findFirst({
        where: { userId },
      });
      where.parents = {
        some: { parentId: parent?.id },
      };
    } else if (userRole === 'TEACHER') {
      // Nauczyciel widzi uczniów ze swoich klas (jako wychowawca)
      const teacher = await this.prisma.teacher.findFirst({
        where: { userId },
        include: { classTeacher: true },
      });
      const classIds = teacher?.classTeacher.map((c) => c.id) || [];
      if (classIds.length > 0) {
        where.classId = { in: classIds };
      }
    }

    // Filtry
    if (classId) {
      where.classId = classId;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { studentNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
          class: true,
          parents: {
            include: {
              parent: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  phone: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          lastName: 'asc',
        },
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userRole: Role, userId: string) {
    const student = await this.prisma.student.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
        class: {
          include: {
            classTeacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
              },
            },
          },
        },
        parents: {
          include: {
            parent: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                email: true,
              },
            },
          },
        },
        grades: {
          where: { deletedAt: null },
          include: {
            subject: true,
            category: true,
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                title: true,
              },
            },
          },
          take: 20,
          orderBy: { date: 'desc' },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Sprawdź uprawnienia
    this.checkAccess(student, userRole, userId);

    return student;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto, userRole: Role, userId: string) {
    const student = await this.findOne(id, userRole, userId);

    const updateData: any = { ...updateStudentDto };
    if (updateStudentDto.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateStudentDto.dateOfBirth);
    }

    return this.prisma.student.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        class: true,
      },
    });
  }

  async remove(id: string) {
    // Soft delete
    return this.prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getStudentGrades(id: string, userRole: Role, userId: string) {
    const student = await this.findOne(id, userRole, userId);

    const grades = await this.prisma.grade.findMany({
      where: {
        studentId: id,
        deletedAt: null,
      },
      include: {
        subject: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            title: true,
          },
        },
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return grades;
  }

  async getStudentAttendance(id: string, userRole: Role, userId: string) {
    const student = await this.findOne(id, userRole, userId);

    const attendance = await this.prisma.attendance.findMany({
      where: {
        studentId: id,
        deletedAt: null,
      },
      include: {
        schedule: {
          include: {
            subject: true,
            teacher: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: 50,
    });

    return attendance;
  }

  private async checkAccess(student: any, userRole: Role, userId: string) {
    if (userRole === 'ADMIN') {
      return; // Admin ma dostęp do wszystkiego
    }

    if (userRole === 'STUDENT') {
      if (student.userId !== userId) {
        throw new ForbiddenException('You can only access your own data');
      }
    }

    if (userRole === 'PARENT') {
      const parent = await this.prisma.parent.findFirst({
        where: { userId },
      });
      const hasAccess = student.parents.some((sp: any) => sp.parentId === parent?.id);
      if (!hasAccess) {
        throw new ForbiddenException('You can only access your children data');
      }
    }

    if (userRole === 'TEACHER') {
      // Nauczyciel może zobaczyć uczniów ze swoich klas
      const teacher = await this.prisma.teacher.findFirst({
        where: { userId },
        include: { classTeacher: true },
      });
      const classIds = teacher?.classTeacher.map((c) => c.id) || [];
      if (!classIds.includes(student.classId)) {
        throw new ForbiddenException('You can only access students from your classes');
      }
    }
  }
}

