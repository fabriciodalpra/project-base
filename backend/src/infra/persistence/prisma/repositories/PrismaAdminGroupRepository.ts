import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { AdminGroupRepository } from '@app/application/base/ports/AdminGroupRepository';
import { PrismaAdminGroupMapper } from '../mapper/PrismaAdminGroupMapper';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { FindResponse } from '@app/core/repositories/FindResponse';

@Injectable()
export class PrismaAdminGroupRepository implements AdminGroupRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: UniqueEntityID): Promise<AdminGroup | null> {
        const adminGroup = await this.prisma.adminGroup.findUnique({
            where: {
                id: id.toNumber(),
            },
        });
        if (!adminGroup) {
            return null;
        }
        return PrismaAdminGroupMapper.toDomain(adminGroup);
    }

    async findByName(name: string): Promise<AdminGroup | null> {
        const adminGroup = await this.prisma.adminGroup.findFirst({
            where: {
                name,
            },
        });
        if (!adminGroup) {
            return null;
        }
        return PrismaAdminGroupMapper.toDomain(adminGroup);
    }

    async findMany({
        page,
    }: PaginationParams): Promise<FindResponse<AdminGroup>> {
        const itemsPerPage = 10;
        const total_items = await this.prisma.adminGroup.count();
        const from = (page - 1) * itemsPerPage;

        const adminGroups = await this.prisma.adminGroup.findMany({
            skip: from,
            take: itemsPerPage,
            orderBy: {
                createdAt: 'asc',
            },
        });

        return jsonFormatPagination<AdminGroup[]>(
            adminGroups.map((item) => PrismaAdminGroupMapper.toDomain(item)),
            page,
            total_items,
            itemsPerPage,
        );
    }

    async create(adminGroup: AdminGroup): Promise<AdminGroup> {
        const data = PrismaAdminGroupMapper.toPrisma(adminGroup);
        const entity = await this.prisma.adminGroup.create({ data });
        return PrismaAdminGroupMapper.toDomain(entity);
    }

    async update(adminGroup: AdminGroup): Promise<AdminGroup> {
        const data = PrismaAdminGroupMapper.toPrisma(adminGroup);
        await this.prisma.adminGroup.update({
            where: {
                id: data.id,
            },
            data,
        });
        return adminGroup;
    }

    async delete(adminGroup: AdminGroup): Promise<AdminGroup> {
        const data = PrismaAdminGroupMapper.toPrisma(adminGroup);
        await this.prisma.adminGroup.delete({
            where: {
                id: data.id,
            },
        });
        return adminGroup;
    }
}
