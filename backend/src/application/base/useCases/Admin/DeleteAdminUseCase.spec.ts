import { Error, Success } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { hash } from 'bcryptjs';
import { DeleteAdminFactory } from 'src/test/factory/DeleteAdminFactory';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

describe('Delete Admin', () => {
    it('should be able to delete admin', async () => {
        const {
            deleteAdminUseCase,
            inMemoryAdminRepository,
            level,
            adminGroup,
        } = await DeleteAdminFactory();

        const id = new UniqueEntityID();

        const passwordHash = await hash('123456', 8);

        await inMemoryAdminRepository.create(
            new Admin(
                {
                    name: `Jon Doe`,
                    email: `jon-doe@email.com`,
                    status: 'active',
                    password: passwordHash,
                    image: null,
                    level,
                    adminGroup,
                },
                id,
            ),
        );

        const admin = await deleteAdminUseCase.execute({
            id: id.toNumber(),
        });

        expect(admin).instanceOf(Success);
    });

    it("shouldn't be able to delete admin widout admin", async () => {
        const { deleteAdminUseCase } = await DeleteAdminFactory();

        const admin = await deleteAdminUseCase.execute({
            id: new UniqueEntityID().toNumber(),
        });

        expect(admin).instanceOf(Error);
        expect(admin.data).instanceOf(ResourceNotFoundError);
    });
});
