import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { static as expressStatic } from 'express';
import * as exphbs from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use('/vendor', expressStatic(join(__dirname, '..', 'node_modules')));
  // app.use('/js', expressStatic(join(__dirname, '..', 'views/js')));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.engine(
    'hbs',
    exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
    }),
  );

  app.setViewEngine('hbs');

  await app.listen(3000, () => {
    console.log('Listening on port ' + 3000);
  });
}
bootstrap();
