import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
   .setTitle('todo-list')
   .setDescription('API criado em aula utilizando nestJS e MySQL na Generation Brasil')
   .setContact('Henrique Santos', 'https://www.linkedin.com/in/henrique-santos-d-paula/', 'hickdpaul@gmail.com')
   .setVersion('0.1.0')
   .build()
   
   const document = SwaggerModule.createDocument(app, config)
   SwaggerModule.setup('/swagger', app, document)
   
  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.listen(process.env.PORT  || 3000)
}
bootstrap();
