import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Level } from '@app/domain/base/Level';
import { Prisma, Level as PrismaLevel } from '@prisma/client';

export class PrismaLevelMapper {
  static toDomain(entity: PrismaLevel): Level {
    const model = new Level(
      {
        name: entity.name,
      },
      new UniqueEntityID(Number(entity.id)),
    );
    return model;
  }

  static toPrisma(level: Level): Prisma.LevelUncheckedCreateInput {
    return {
      id: level.id.toNumber(),
      name: level.name,
    };
  }
}
