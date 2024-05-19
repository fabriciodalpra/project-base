import { FindAdminUseCase } from '@app/application/base/useCases/Admin/FindAdminUseCase';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { Level } from '@app/domain/base/Level';
import { InMemoryAdminGroupRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminGroupRepository';
import { InMemoryAdminRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminRepository';
import { InMemoryLevelRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryLevelRepository';

export async function FindAdminFactory() {
    const inMemoryAdminRepository = new InMemoryAdminRepository();
    const inMemoryLevelRepository = new InMemoryLevelRepository();
    const inMemoryAdminGroupRepository = new InMemoryAdminGroupRepository();
    const findAdminUseCase = new FindAdminUseCase(inMemoryAdminRepository);

    const level = await inMemoryLevelRepository.create(
        new Level({
            id: new UniqueEntityID(),
            name: 'Admin',
        }),
    );

    const adminGroup = await inMemoryAdminGroupRepository.create(
        new AdminGroup({
            id: new UniqueEntityID(),
            name: 'Admin',
        }),
    );

    return { findAdminUseCase, inMemoryAdminRepository, level, adminGroup };
}
