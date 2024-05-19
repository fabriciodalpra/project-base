import { CreateAdminUseCase } from '@app/application/base/useCases/Admin/CreateAdminUseCase';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { Level } from '@app/domain/base/Level';
import { InMemoryAdminGroupRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminGroupRepository';
import { InMemoryAdminRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminRepository';
import { InMemoryFileRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryFileRepository';
import { InMemoryLevelRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryLevelRepository';

export async function CreateAdminFactory() {
    const inMemoryAdminRepository = new InMemoryAdminRepository();
    const inMemoryLevelRepository = new InMemoryLevelRepository();
    const inMemoryAdminGroupRepository = new InMemoryAdminGroupRepository();
    const inMemoryFileRepository = new InMemoryFileRepository();

    const createAdminUseCase = new CreateAdminUseCase(
        inMemoryAdminRepository,
        inMemoryLevelRepository,
        inMemoryAdminGroupRepository,
        inMemoryFileRepository,
    );

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

    return { createAdminUseCase, level, adminGroup };
}
