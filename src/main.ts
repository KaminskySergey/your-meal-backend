import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5174',
      'https://your-meal-frontend.vercel.app', 
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server is running on http://localhost:${PORT}/api`);
  console.log(process.env.PORT);
}
bootstrap();
