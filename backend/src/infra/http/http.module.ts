import { Module } from '@nestjs/common';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { AdminController } from './AdminController';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import { GetAdminUseCase } from '@app/application/base/useCases/Admin/GetAdminUseCase';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthenticateController } from './AuthenticateController';
import { AuthenticateAdminUseCase } from '@app/application/base/useCases/Admin/AuthenticateAdminUseCase';
import { AuthModule } from './auth/auth.module';
import { DeleteAdminUseCase } from '@app/application/base/useCases/Admin/DeleteAdminUseCase';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../', '/public'),
      serveStaticOptions: { index: false },
    }),
    AuthModule,
    CacheManagerModule,
  ],
  controllers: [
    AdminController,
    AuthenticateController,
    AuthenticateController,
  ],
  providers: [
    CreateAdminUseCase,
    FindAdminUseCase,
    GetAdminUseCase,
    DeleteAdminUseCase,
    AuthenticateAdminUseCase,
  ],
  exports: [],
})
export class HttpModule {}
