import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';


dotenv.config({ path: './.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Management Boarding House by Nonsense Dev')
    .setDescription('Nonsense Things')
    .setVersion('1.0')
    .addApiKey()
    .addBearerAuth()
    .addOAuth2()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.APP_PORT ?? 3000, '0.0.0.0');
}
bootstrap();
