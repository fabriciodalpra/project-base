import { AuthenticateAdminUseCase } from '@app/application/base/useCases/Admin/AuthenticateAdminUseCase';
import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { DeleteAdminUseCase } from '@app/application/base/useCases/Admin/DeleteAdminUseCase';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import { GetAdminUseCase } from '@app/application/base/useCases/Admin/GetAdminUseCase';
import { UpdateAdminUseCase } from '@app/application/base/useCases/Admin/UpdateAdminUseCase';
import { UpdatePasswordAdminUseCase } from '@app/application/base/useCases/Admin/UpdatePasswordAdminUseCase';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminController } from './AdminController';
import { AuthenticateController } from './AuthenticateController';
import { AuthModule } from './auth/auth.module';

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
        UpdateAdminUseCase,
        UpdatePasswordAdminUseCase,
        AuthenticateAdminUseCase,
    ],
    exports: [],
})
export class HttpModule {}
