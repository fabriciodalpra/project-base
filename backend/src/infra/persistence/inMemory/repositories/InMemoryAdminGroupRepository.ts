import { Injectable } from '@nestjs/common';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { AdminGroupRepository } from '@app/application/base/ports/AdminGroupRepository';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { jsonFormatPagination } from 'src/helpers/responseHelpers';

@Injectable()
export class InMemoryAdminGroupRepository implements AdminGroupRepository {
    public adminGroups: AdminGroup[] = [];

    async findById(id: UniqueEntityID): Promise<AdminGroup | null> {
        const adminGroup = this.adminGroups.find((adminGroup) =>
            adminGroup.id.equals(id),
        );
        if (!adminGroup) {
            return null;
        }
        return adminGroup;
    }

    async findByName(name: string): Promise<AdminGroup | null> {
        const adminGroup = this.adminGroups.find(
            (adminGroup) => adminGroup.name === name,
        );
        if (!adminGroup) {
            return null;
        }
        return adminGroup;
    }

    async findMany({
        page,
    }: PaginationParams): Promise<FindResponse<AdminGroup>> {
        const itemsPerPage = 20;
        const adminGroups = this.adminGroups.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage,
        );
        return jsonFormatPagination<AdminGroup[]>(
            adminGroups,
            page,
            this.adminGroups.length,
            itemsPerPage,
        );
    }

    async create(adminGroup: AdminGroup): Promise<AdminGroup> {
        this.adminGroups = [...this.adminGroups, adminGroup];
        return adminGroup;
    }

    async update(adminGroup: AdminGroup): Promise<AdminGroup> {
        const indexAdminGroup = this.adminGroups.findIndex(
            (curAdminGroup) => curAdminGroup.id === adminGroup.id,
        );
        if (indexAdminGroup != -1) {
            this.adminGroups[indexAdminGroup] = adminGroup;
        }
        return adminGroup;
    }

    async delete(adminGroup: AdminGroup): Promise<AdminGroup> {
        const indexAdminGroup = this.adminGroups.findIndex(
            (curAdminGroup) => curAdminGroup.id === adminGroup.id,
        );
        this.adminGroups.splice(indexAdminGroup, 1);
        return adminGroup;
    }
}
