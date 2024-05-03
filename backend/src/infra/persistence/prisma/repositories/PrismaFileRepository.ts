import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { File } from '@app/domain/base/File';
import { PrismaFileMapper } from '../mapper/PrismaFileMapper';
import { FileRepository } from '@app/application/base/ports/FileRepository';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';

@Injectable()
export class PrismaFileRepository implements FileRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<File | null> {
    const file = await this.prisma.file.findUnique({
      where: {
        id: id.toNumber(),
      },
    });
    if (!file) {
      return null;
    }
    return PrismaFileMapper.toDomain(file);
  }

  async findByName(name: string): Promise<File | null> {
    const file = await this.prisma.file.findFirst({
      where: {
        name,
      },
    });
    if (!file) {
      return null;
    }
    return PrismaFileMapper.toDomain(file);
  }

  async findMany({ page }: PaginationParams): Promise<FindResponse<File>> {
    const itemsPerPage = 10;
    const total_items = await this.prisma.file.count();
    const from = (page - 1) * itemsPerPage;

    const files = await this.prisma.file.findMany({
      skip: from,
      take: itemsPerPage,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return jsonFormatPagination<File[]>(
      files.map((item) => PrismaFileMapper.toDomain(item)),
      page,
      total_items,
      itemsPerPage,
    );
  }

  async create(file: File): Promise<File> {
    const data = PrismaFileMapper.toPrisma(file);
    const entity = await this.prisma.file.create({ data });
    return PrismaFileMapper.toDomain(entity);
  }

  async update(file: File): Promise<File> {
    const data = PrismaFileMapper.toPrisma(file);
    await this.prisma.file.update({
      where: {
        id: data.id,
      },
      data,
    });
    return file;
  }

  async delete(file: File): Promise<File> {
    const data = PrismaFileMapper.toPrisma(file);
    await this.prisma.file.delete({
      where: {
        id: data.id,
      },
    });
    return file;
  }
}
