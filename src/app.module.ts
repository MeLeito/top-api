import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Загружает переменные окружения из .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Импортирует ConfigModule для получения конфигурации
      inject: [ConfigService], // Инжектирует ConfigService для доступа к переменным окружения
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Получает строку подключения из переменных окружения

      }),
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
  ],
})
export class AppModule { }