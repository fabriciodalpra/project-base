import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { File } from '@app/domain/base/File';
import { Prisma, File as PrismaFile } from '@prisma/client';

export class PrismaFileMapper {
  static toDomain(entity: PrismaFile): File {
    const model = new File(
      {
        type: entity.type,
        filename: entity.filename,
        name: entity.name,
        extension: entity.extension,
        mime: entity.mime,
        url: entity.url,
      },
      new UniqueEntityID(Number(entity.id)),
    );
    return model;
  }

  static toPrisma(file: File): Prisma.FileUncheckedCreateInput {
    return {
      id: file.id.toNumber(),
      type: file.type,
      filename: file.filename,
      name: file.name,
      extension: file.extension,
      mime: file.mime,
      url: file.url,
    };
  }
}
