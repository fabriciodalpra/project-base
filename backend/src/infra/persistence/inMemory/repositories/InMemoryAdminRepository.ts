import { AdminRepository } from '@app/application/base/ports/AdminRepository';
import { Injectable } from '@nestjs/common';
import { Admin } from '@app/domain/base/Admin';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';

@Injectable()
export class InMemoryAdminRepository implements AdminRepository {
    public admins: Admin[] = [];

    async findById(id: UniqueEntityID): Promise<Admin | null> {
        const admin = this.admins.find((admin) => admin.id.equals(id));
        if (!admin) {
            return null;
        }
        return admin;
    }

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = this.admins.find((admin) => admin.email === email);
        if (!admin) {
            return null;
        }
        return admin;
    }

    async findMany({ page }: PaginationParams): Promise<FindResponse<Admin>> {
        const itemsPerPage = 20;
        const admins = this.admins.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage,
        );
        return jsonFormatPagination<Admin[]>(
            admins,
            page,
            this.admins.length,
            itemsPerPage,
        );
    }

    async create(admin: Admin): Promise<Admin> {
        this.admins = [...this.admins, admin];
        return admin;
    }

    async update(admin: Admin): Promise<Admin> {
        const indexAdmin = this.admins.findIndex(
            (curAdmin) => curAdmin.id === admin.id,
        );
        if (indexAdmin != -1) {
            this.admins[indexAdmin] = admin;
        }
        return admin;
    }

    async delete(admin: Admin): Promise<Admin> {
        const indexAdmin = this.admins.findIndex(
            (curAdmin) => curAdmin.id === admin.id,
        );
        this.admins.splice(indexAdmin, 1);
        return admin;
    }
}
