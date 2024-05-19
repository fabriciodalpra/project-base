import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { FindResponse } from '@app/core/repositories/FindResponse';
import { PaginationParams } from '@app/core/repositories/PaginationParams';
import { Level } from '@app/domain/base/Level';

export abstract class LevelRepository {
    abstract findById(id: UniqueEntityID): Promise<Level | null>;
    abstract findByName(name: string): Promise<Level | null>;
    abstract findMany(params: PaginationParams): Promise<FindResponse<Level>>;
    abstract create(data: Level): Promise<Level>;
    abstract update(data: Level): Promise<Level>;
    abstract delete(data: Level): Promise<Level>;
}
