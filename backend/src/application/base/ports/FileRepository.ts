import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { File } from '@app/domain/base/File';

export abstract class FileRepository {
  abstract findById(id: UniqueEntityID): Promise<File | null>;
  abstract findByName(name: string): Promise<File | null>;
  abstract findMany(params: PaginationParams): Promise<FindResponse<File>>;
  abstract create(data: File): Promise<File>;
  abstract update(data: File): Promise<File>;
  abstract delete(data: File): Promise<File>;
}
