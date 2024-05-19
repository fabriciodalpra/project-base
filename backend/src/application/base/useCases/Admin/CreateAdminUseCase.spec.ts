import { Error, Success } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { hash } from 'bcryptjs';
import { CreateAdminFactory } from 'src/test/factory/CreateAdminFactory';
import { describe, expect, it } from 'vitest';
import { ResourceAlreadyExistsError } from '../errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

describe('Create Admin', () => {
    it('should be able to create new admin', async () => {
        const { createAdminUseCase, level, adminGroup } =
            await CreateAdminFactory();

        const passwordHash = await hash('123456', 8);

        const admin = await createAdminUseCase.execute({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level_id: BigInt(level.id.toNumber()),
            admin_group_id: BigInt(adminGroup.id.toNumber()),
        });

        expect(admin).instanceOf(Success);
        expect(admin.data).contains({
            email: 'jon-doe@email.com',
        });
    });

    it("shouldn't be possible to create a new admin with an existing email", async () => {
        const { createAdminUseCase, level, adminGroup } =
            await CreateAdminFactory();

        const passwordHash = await hash('123456', 8);

        await createAdminUseCase.execute({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level_id: BigInt(level.id.toNumber()),
            admin_group_id: BigInt(adminGroup.id.toNumber()),
        });

        const admin = await createAdminUseCase.execute({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level_id: BigInt(level.id.toNumber()),
            admin_group_id: BigInt(adminGroup.id.toNumber()),
        });

        expect(admin).instanceOf(Error);
        expect(admin.data).instanceOf(ResourceAlreadyExistsError);
    });

    it("shouldn't be able to create new admin widout level", async () => {
        const { createAdminUseCase, adminGroup } = await CreateAdminFactory();

        const passwordHash = await hash('123456', 8);

        const admin = await createAdminUseCase.execute({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level_id: BigInt(new UniqueEntityID().toNumber()),
            admin_group_id: BigInt(adminGroup.id.toNumber()),
        });

        expect(admin).instanceOf(Error);
        expect(admin.data).instanceOf(ResourceNotFoundError);
    });

    it("shouldn't be able to create new admin widout group", async () => {
        const { createAdminUseCase, level } = await CreateAdminFactory();

        const passwordHash = await hash('123456', 8);

        const admin = await createAdminUseCase.execute({
            name: 'Jon Doe',
            email: 'jon-doe@email.com',
            status: 'active',
            password: passwordHash,
            level_id: BigInt(level.id.toNumber()),
            admin_group_id: BigInt(new UniqueEntityID().toNumber()),
        });

        expect(admin).instanceOf(Error);
        expect(admin.data).instanceOf(ResourceNotFoundError);
    });
});
