import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { Prisma, AdminGroup as PrismaAdminGroup } from '@prisma/client';

export class PrismaAdminGroupMapper {
  static toDomain(entity: PrismaAdminGroup): AdminGroup {
    const model = new AdminGroup(
      {
        name: entity.name,
      },
      new UniqueEntityID(Number(entity.id)),
    );
    return model;
  }

  static toPrisma(
    adminGroup: AdminGroup,
  ): Prisma.AdminGroupUncheckedCreateInput {
    return {
      id: adminGroup.id.toNumber(),
      name: adminGroup.name,
    };
  }
}
