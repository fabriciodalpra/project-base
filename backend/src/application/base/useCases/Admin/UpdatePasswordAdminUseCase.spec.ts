import { Error, Success } from '@app/core/Result';
import { hash } from 'bcryptjs';
import { UpdatePasswordAdminFactory } from 'src/test/factory/UpdatePasswordAdminFactory';
import { describe, expect, it } from 'vitest';
import { InvalidInformationError } from '../errors/InvalidInformationError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

describe('Update Admin Password', () => {
    it('should be able to update password admin', async () => {
        const { updatePasswordAdminUseCase, admin } =
            await UpdatePasswordAdminFactory();

        const newPasswordHash = '1234';

        const updateAdmin = await updatePasswordAdminUseCase.execute({
            id: BigInt(admin.id.toNumber()),
            password: newPasswordHash,
            currentPassword: '123456',
        });

        expect(updateAdmin).instanceOf(Success);
    });

    it("shouldn't be possible to update a admin password passing the invalid current password", async () => {
        const { updatePasswordAdminUseCase, admin } =
            await UpdatePasswordAdminFactory();

        const newPasswordHash = '1234';

        const updateAdmin = await updatePasswordAdminUseCase.execute({
            id: BigInt(admin.id.toNumber()),
            password: newPasswordHash,
            currentPassword: '1111',
        });

        expect(updateAdmin).instanceOf(Error);
        expect(updateAdmin.data).instanceOf(InvalidInformationError);
    });

    it("shouldn't be possible to update a admin password with an existing id", async () => {
        const { updatePasswordAdminUseCase } =
            await UpdatePasswordAdminFactory();

        const newPasswordHash = await hash('1234', 8);
        const currentPassword = await hash('123456', 8);

        const updateAdmin = await updatePasswordAdminUseCase.execute({
            id: BigInt(1234),
            password: newPasswordHash,
            currentPassword,
        });

        expect(updateAdmin).instanceOf(Error);
        expect(updateAdmin.data).instanceOf(ResourceNotFoundError);
    });
});
