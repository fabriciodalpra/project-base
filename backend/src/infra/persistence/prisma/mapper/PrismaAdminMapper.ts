import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import {
    Prisma,
    Level,
    AdminGroup,
    File,
    Admin as PrismaAdmin,
} from '@prisma/client';
import { PrismaLevelMapper } from './PrismaLevelMapper';
import { PrismaAdminGroupMapper } from './PrismaAdminGroupMapper';
import { PrismaFileMapper } from './PrismaFileMapper';

interface PrismaAdminEntity extends PrismaAdmin {
    level: Level;
    group: AdminGroup;
    image: File | null;
}

export class PrismaAdminMapper {
    static toDomain(entity: PrismaAdminEntity): Admin {
        const model = new Admin(
            {
                name: entity.name,
                email: entity.email,
                status: entity.status,
                password: entity.password,
                level: PrismaLevelMapper.toDomain(entity.level),
                adminGroup: PrismaAdminGroupMapper.toDomain(entity.group),
                image: entity.image
                    ? PrismaFileMapper.toDomain(entity.image)
                    : null,
            },
            new UniqueEntityID(Number(entity.id)),
        );
        return model;
    }

    static toPrisma(admin: Admin): Prisma.AdminUncheckedCreateInput {
        return {
            id: admin.id?.toNumber(),
            name: admin.name,
            email: admin.email,
            status: admin.status,
            password: admin.password,
            levelId: admin.level.id.toValue(),
            adminGroupId: admin.adminGroup.id.toValue(),
        };
    }
}
