import { Module } from '@nestjs/common';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { BaseModule } from '@app/application/base/base.module';
import { PersistenceModule } from '@app/infra/persistence/persistence.module';

@Module({
    imports: [
        DevtoolsModule.register({
            http: process.env.NODE_ENV !== 'production',
        }),
        PersistenceModule.register({
            type: process.env.NODE_ENV !== 'test' ? 'prisma' : 'memory',
            global: true,
        }),
        BaseModule,
    ],
})
export class AppModule {}
