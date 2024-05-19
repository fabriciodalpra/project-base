import { Error, Success } from '@app/core/Result';
import { UpdateAdminFactory } from 'src/test/factory/UpdateAdminFactory';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

describe('Update Admin', () => {
    it('should be able to update admin', async () => {
        const { updateAdminUseCase, admin } = await UpdateAdminFactory();

        const updateAdmin = await updateAdminUseCase.execute({
            id: BigInt(admin.id.toNumber()),
            name: 'Jon Doe Updated',
            email: 'jon-doe@email.com',
            status: 'active',
            level_id: BigInt(admin.level.id.toNumber()),
            admin_group_id: BigInt(admin.adminGroup.id.toNumber()),
        });

        expect(updateAdmin).instanceOf(Success);
        expect(updateAdmin.data).contains({
            name: 'Jon Doe Updated',
        });
    });

    it("shouldn't be possible to update a admin with an existing id", async () => {
        const { updateAdminUseCase, admin } = await UpdateAdminFactory();

        const updateAdmin = await updateAdminUseCase.execute({
            id: BigInt(123456),
            name: 'Jon Doe Updated',
            email: 'jon-doe@email.com',
            status: 'active',
            level_id: BigInt(admin.level.id.toNumber()),
            admin_group_id: BigInt(admin.adminGroup.id.toNumber()),
        });

        expect(updateAdmin).instanceOf(Error);
        expect(updateAdmin.data).instanceOf(ResourceNotFoundError);
    });

    it("shouldn't be able to update admin widout level", async () => {
        const { updateAdminUseCase, admin } = await UpdateAdminFactory();

        const updateAdmin = await updateAdminUseCase.execute({
            id: BigInt(admin.id.toNumber()),
            name: 'Jon Doe Updated',
            email: 'jon-doe@email.com',
            status: 'active',
            level_id: BigInt(123456),
            admin_group_id: BigInt(admin.adminGroup.id.toNumber()),
        });

        expect(updateAdmin).instanceOf(Error);
        expect(updateAdmin.data).instanceOf(ResourceNotFoundError);
    });

    it("shouldn't be able to update admin widout group", async () => {
        const { updateAdminUseCase, admin } = await UpdateAdminFactory();

        const updateAdmin = await updateAdminUseCase.execute({
            id: BigInt(admin.id.toNumber()),
            name: 'Jon Doe Updated',
            email: 'jon-doe@email.com',
            status: 'active',
            level_id: BigInt(admin.level.id.toNumber()),
            admin_group_id: BigInt(123456),
        });

        expect(updateAdmin).instanceOf(Error);
        expect(updateAdmin.data).instanceOf(ResourceNotFoundError);
    });
});
