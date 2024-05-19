import { Module } from '@nestjs/common';
import { EnvModule } from '@app/infra/env';
import { AdminRepository } from '@app/application/base/ports/AdminRepository';
import { PrismaAdminRepository } from './repositories/PrismaAdminRepository';
import { AdminGroupRepository } from '@app/application/base/ports/AdminGroupRepository';
import { PrismaAdminGroupRepository } from './repositories/PrismaAdminGroupRepository';
import { FileRepository } from '@app/application/base/ports/FileRepository';
import { PrismaFileRepository } from './repositories/PrismaFileRepository';
import { LevelRepository } from '@app/application/base/ports/LevelRepository';
import { PrismaLevelRepository } from './repositories/PrismaLevelRepository';
import { PrismaService } from './prisma.service';

@Module({
    imports: [EnvModule],
    providers: [
        PrismaService,
        {
            provide: AdminGroupRepository,
            useClass: PrismaAdminGroupRepository,
        },
        {
            provide: AdminRepository,
            useClass: PrismaAdminRepository,
        },
        {
            provide: FileRepository,
            useClass: PrismaFileRepository,
        },
        {
            provide: LevelRepository,
            useClass: PrismaLevelRepository,
        },
    ],
    exports: [
        PrismaService,
        AdminGroupRepository,
        AdminRepository,
        FileRepository,
        LevelRepository,
    ],
})
export class PrismaModule {}
