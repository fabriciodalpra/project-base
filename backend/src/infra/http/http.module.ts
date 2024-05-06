import { Module } from '@nestjs/common';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { AdminController } from './AdminController';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import { GetAdminUseCase } from '@app/application/base/useCases/Admin/GetAdminUseCase';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../', '/public'),
      serveStaticOptions: { index: false },
    }),
    CacheManagerModule,
  ],
  controllers: [AdminController],
  providers: [CreateAdminUseCase, FindAdminUseCase, GetAdminUseCase],
  exports: [],
})
export class HttpModule {}
