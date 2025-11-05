import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Rejestracja nowego użytkownika' })
  @ApiResponse({ status: 201, description: 'Użytkownik został utworzony' })
  @ApiResponse({ status: 409, description: 'Username lub email już istnieje' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Logowanie użytkownika' })
  @ApiResponse({ status: 200, description: 'Zalogowano pomyślnie' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowe dane logowania' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Odświeżenie tokenu dostępu' })
  @ApiResponse({ status: 200, description: 'Token odświeżony' })
  @ApiResponse({ status: 401, description: 'Nieprawidłowy refresh token' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Pobierz dane zalogowanego użytkownika' })
  @ApiResponse({ status: 200, description: 'Dane użytkownika' })
  @ApiResponse({ status: 401, description: 'Nieautoryzowany' })
  async getMe(@CurrentUser() user: any) {
    return this.authService.getMe(user.id);
  }
}

