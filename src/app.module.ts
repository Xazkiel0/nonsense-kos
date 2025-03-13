import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../..', '.env.local'),
    }),
    DrizzleModule,
    UsersModule,
    RoomsModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule { }
