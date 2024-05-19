import { Module } from '@nestjs/common';
import { EnvModule } from '@app/infra/env';
import { AdminRepository } from '@app/application/base/ports/AdminRepository';
import { InMemoryAdminRepository } from './repositories/InMemoryAdminRepository';
import { LevelRepository } from '@app/application/base/ports/LevelRepository';
import { InMemoryLevelRepository } from './repositories/InMemoryLevelRepository';
import { AdminGroupRepository } from '@app/application/base/ports/AdminGroupRepository';
import { InMemoryAdminGroupRepository } from './repositories/InMemoryAdminGroupRepository';
import { FileRepository } from '@app/application/base/ports/FileRepository';
import { InMemoryFileRepository } from './repositories/InMemoryFileRepository';

@Module({
    imports: [EnvModule],
    providers: [
        {
            provide: AdminGroupRepository,
            useClass: InMemoryAdminGroupRepository,
        },
        {
            provide: AdminRepository,
            useClass: InMemoryAdminRepository,
        },
        {
            provide: FileRepository,
            useClass: InMemoryFileRepository,
        },
        {
            provide: LevelRepository,
            useClass: InMemoryLevelRepository,
        },
    ],
    exports: [
        AdminGroupRepository,
        AdminRepository,
        FileRepository,
        LevelRepository,
    ],
})
export class InMemoryModule {}
