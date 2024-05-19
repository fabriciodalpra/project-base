import { UpdateAdminUseCase } from '@app/application/base/useCases/Admin/UpdateAdminUseCase';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { AdminGroup } from '@app/domain/base/AdminGroup';
import { Level } from '@app/domain/base/Level';
import { InMemoryAdminGroupRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminGroupRepository';
import { InMemoryAdminRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryAdminRepository';
import { InMemoryFileRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryFileRepository';
import { InMemoryLevelRepository } from '@app/infra/persistence/inMemory/repositories/InMemoryLevelRepository';
import { hash } from 'bcryptjs';

export async function UpdateAdminFactory() {
    const inMemoryAdminRepository = new InMemoryAdminRepository();
    const inMemoryLevelRepository = new InMemoryLevelRepository();
    const inMemoryAdminGroupRepository = new InMemoryAdminGroupRepository();
    const inMemoryFileRepository = new InMemoryFileRepository();

    const updateAdminUseCase = new UpdateAdminUseCase(
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

    const passwordHash = await hash('123456', 8);

    const admin = await inMemoryAdminRepository.create(
        new Admin({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level: level,
            adminGroup: adminGroup,
            image: null,
        }),
    );

    return { updateAdminUseCase, admin };
}
