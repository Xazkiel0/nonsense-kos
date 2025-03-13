import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../..', '.env.local'),
    }),
    DrizzleModule,
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule { }
