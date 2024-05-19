import { AdminRepository } from '@app/application/base/ports/AdminRepository';
import { PrismaAdminMapper } from '../mapper/PrismaAdminMapper';
import { Injectable } from '@nestjs/common';
import { Admin } from '@app/domain/base/Admin';
import { PrismaService } from '../prisma.service';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
    constructor(private prisma: PrismaService) {}

    async findById(id: UniqueEntityID): Promise<Admin | null> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id: id.toNumber(),
            },
            include: {
                level: true,
                group: true,
                image: true,
            },
        });
        if (!admin) {
            return null;
        }
        return PrismaAdminMapper.toDomain(admin);
    }

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = await this.prisma.admin.findUnique({
            where: {
                email,
            },
            include: {
                level: true,
                group: true,
                image: true,
            },
        });
        if (!admin) {
            return null;
        }
        return PrismaAdminMapper.toDomain(admin);
    }

    async findMany({ page }: PaginationParams): Promise<FindResponse<Admin>> {
        const itemsPerPage = 10;
        const total_items = await this.prisma.admin.count();
        const from = (page - 1) * itemsPerPage;

        const admins = await this.prisma.admin.findMany({
            skip: from,
            take: itemsPerPage,
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                level: true,
                group: true,
                image: true,
            },
        });

        return jsonFormatPagination<Admin[]>(
            admins.map((item) => PrismaAdminMapper.toDomain(item)),
            page,
            total_items,
            itemsPerPage,
        );
    }

    async create(admin: Admin): Promise<Admin> {
        const data = PrismaAdminMapper.toPrisma(admin);
        const entity = await this.prisma.admin.create({
            data,
            include: {
                level: true,
                group: true,
                image: true,
            },
        });
        return PrismaAdminMapper.toDomain(entity);
    }

    async update(admin: Admin): Promise<Admin> {
        const data = PrismaAdminMapper.toPrisma(admin);
        await this.prisma.admin.update({
            where: {
                id: data.id,
            },
            data,
        });
        return admin;
    }

    async delete(admin: Admin): Promise<Admin> {
        const data = PrismaAdminMapper.toPrisma(admin);
        await this.prisma.admin.delete({
            where: {
                id: data.id,
            },
        });
        return admin;
    }
}
