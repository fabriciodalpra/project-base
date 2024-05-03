import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { AdminGroup } from '@app/domain/base/AdminGroup';

export abstract class AdminGroupRepository {
  abstract findById(id: UniqueEntityID): Promise<AdminGroup | null>;
  abstract findByName(name: string): Promise<AdminGroup | null>;
  abstract findMany(
    params: PaginationParams,
  ): Promise<FindResponse<AdminGroup>>;
  abstract create(data: AdminGroup): Promise<AdminGroup>;
  abstract update(data: AdminGroup): Promise<AdminGroup>;
  abstract delete(data: AdminGroup): Promise<AdminGroup>;
}
