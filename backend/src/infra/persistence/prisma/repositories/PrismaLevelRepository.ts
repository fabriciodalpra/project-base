import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { LevelRepository } from '@app/application/base/ports/LevelRepository';
import { Level } from '@app/domain/base/Level';
import { PrismaLevelMapper } from '../mapper/PrismaLevelMapper';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { FindResponse } from '@app/core/repositories/FindResponse';

@Injectable()
export class PrismaLevelRepository implements LevelRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: UniqueEntityID): Promise<Level | null> {
        const level = await this.prisma.level.findUnique({
            where: {
                id: id.toNumber(),
            },
        });
        if (!level) {
            return null;
        }
        return PrismaLevelMapper.toDomain(level);
    }

    async findByName(name: string): Promise<Level | null> {
        const level = await this.prisma.level.findFirst({
            where: {
                name,
            },
        });
        if (!level) {
            return null;
        }
        return PrismaLevelMapper.toDomain(level);
    }

    async findMany({ page }: PaginationParams): Promise<FindResponse<Level>> {
        const itemsPerPage = 10;
        const total_items = await this.prisma.level.count();
        const from = (page - 1) * itemsPerPage;

        const levels = await this.prisma.level.findMany({
            skip: from,
            take: itemsPerPage,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return jsonFormatPagination<Level[]>(
            levels.map((item) => PrismaLevelMapper.toDomain(item)),
            page,
            total_items,
            itemsPerPage,
        );
    }

    async create(level: Level): Promise<Level> {
        const data = PrismaLevelMapper.toPrisma(level);
        const entity = await this.prisma.level.create({ data });
        return PrismaLevelMapper.toDomain(entity);
    }

    async update(level: Level): Promise<Level> {
        const data = PrismaLevelMapper.toPrisma(level);
        await this.prisma.level.update({
            where: {
                id: data.id,
            },
            data,
        });
        return level;
    }

    async delete(level: Level): Promise<Level> {
        const data = PrismaLevelMapper.toPrisma(level);
        await this.prisma.level.delete({
            where: {
                id: data.id,
            },
        });
        return level;
    }
}
