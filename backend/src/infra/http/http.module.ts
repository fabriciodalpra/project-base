import { Module } from '@nestjs/common';
import { CacheManagerModule } from '@app/infra/persistence/cache/cache.module';
import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { AdminController } from './AdminController';
import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';

@Module({
  imports: [CacheManagerModule],
  controllers: [AdminController],
  providers: [CreateAdminUseCase, FindAdminUseCase],
  exports: [],
})
export class HttpModule {}
