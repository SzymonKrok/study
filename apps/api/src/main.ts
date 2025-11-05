import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global filters
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Usuń właściwości nie zdefiniowane w DTO
      forbidNonWhitelisted: true, // Rzuć błąd jeśli są dodatkowe właściwości
      transform: true, // Automatyczna transformacja typów
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('E-Dziennik API')
    .setDescription('API dokumentacja dla systemu e-dziennika')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Endpointy autentykacji')
    .addTag('Students', 'Zarządzanie uczniami')
    .addTag('Teachers', 'Zarządzanie nauczycielami')
    .addTag('Classes', 'Zarządzanie klasami')
    .addTag('Grades', 'Zarządzanie ocenami')
    .addTag('Attendance', 'Zarządzanie frekwencją')
    .addTag('Schedule', 'Plan lekcji')
    .addTag('Events', 'Wydarzenia szkolne')
    .addTag('Homework', 'Zadania domowe')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT || 3001;

  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(
    `📚 Swagger docs available at http://localhost:${port}/api/docs`,
  );
}

void bootstrap();