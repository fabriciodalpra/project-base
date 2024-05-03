import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { Admin } from '@app/domain/base/Admin';

export abstract class AdminRepository {
  abstract findById(id: UniqueEntityID): Promise<Admin | null>;
  abstract findByEmail(email: string): Promise<Admin | null>;
  abstract findMany(params: PaginationParams): Promise<FindResponse<Admin>>;
  abstract create(data: Admin): Promise<Admin>;
  abstract update(data: Admin): Promise<Admin>;
  abstract delete(data: Admin): Promise<Admin>;
}
