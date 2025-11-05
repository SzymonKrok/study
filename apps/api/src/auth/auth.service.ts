import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from 'database';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Sprawdź czy username już istnieje
    const existingUsername = await this.prisma.user.findUnique({
      where: { username: registerDto.username },
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Sprawdź czy email już istnieje
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hashuj hasło
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Stwórz użytkownika z odpowiednią rolą
    const user = await this.prisma.user.create({
      data: {
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
        role: registerDto.role,
      },
    });

    // Stwórz profil w zależności od roli
    switch (registerDto.role) {
      case 'STUDENT':
        await this.prisma.student.create({
          data: {
            userId: user.id,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            studentNumber: await this.generateStudentNumber(),
            dateOfBirth: new Date(), // TODO: Add to DTO
          },
        });
        break;

      case 'TEACHER':
        await this.prisma.teacher.create({
          data: {
            userId: user.id,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            phone: '', // TODO: Add to DTO
          },
        });
        break;

      case 'PARENT':
        await this.prisma.parent.create({
          data: {
            userId: user.id,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
            phone: '', // TODO: Add to DTO
          },
        });
        break;

      case 'ADMIN':
        await this.prisma.admin.create({
          data: {
            userId: user.id,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            email: registerDto.email,
          },
        });
        break;
    }

    // Pobierz pełne dane użytkownika
    const fullUser = await this.prisma.user.findUnique({
      where: { id: user.id },
      include: {
        student: true,
        teacher: true,
        parent: true,
        admin: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.username, user.role);

    return {
      user: this.excludePassword(fullUser!),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    // Znajdź użytkownika
    const user = await this.prisma.user.findUnique({
      where: { username: loginDto.username },
      include: {
        student: true,
        teacher: true,
        parent: true,
        admin: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Sprawdź czy aktywny
    if (!user.isActive || user.deletedAt) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Sprawdź hasło
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Zaktualizuj lastLogin
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const tokens = await this.generateTokens(user.id, user.username, user.role);

    return {
      user: this.excludePassword(user),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.isActive || user.deletedAt) {
        throw new UnauthorizedException('User not found or inactive');
      }

      const tokens = await this.generateTokens(user.id, user.username, user.role);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            class: true,
            parents: {
              include: {
                parent: {
                  include: { user: true },
                },
              },
            },
          },
        },
        teacher: {
          include: {
            subjects: {
              include: { subject: true },
            },
            classTeacher: true,
          },
        },
        parent: {
          include: {
            students: {
              include: {
                student: {
                  include: {
                    class: true,
                    user: true,
                  },
                },
              },
            },
          },
        },
        admin: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.excludePassword(user);
  }

  private async generateTokens(userId: string, username: string, role: Role) {
    const payload = { sub: userId, username, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
        expiresIn: '15m', // Access token - 15 minut
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
        expiresIn: '7d', // Refresh token - 7 dni
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async generateStudentNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.student.count();
    return `${year}${String(count + 1).padStart(3, '0')}`;
  }

  private excludePassword(user: any) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

