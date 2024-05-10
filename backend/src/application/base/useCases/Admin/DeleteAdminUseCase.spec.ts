import { expect, it, describe } from 'vitest';
import { Success, Error } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { DeleteAdminFactory } from 'src/test/factory/DeleteAdminFactory';
import { Admin } from '@app/domain/base/Admin';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

describe('Delete Admin', () => {
  it('should be able to delete admin', async () => {
    const { deleteAdminUseCase, inMemoryAdminRepository, level, adminGroup } =
      await DeleteAdminFactory();

    const id = new UniqueEntityID();

    await inMemoryAdminRepository.create(
      new Admin(
        {
          name: `Jon Doe`,
          email: `jon-doe@email.com`,
          status: 'active',
          password: '123456',
          image: null,
          level,
          adminGroup,
        },
        id,
      ),
    );

    const admin = await deleteAdminUseCase.execute({
      id: BigInt(id.toNumber()),
    });

    expect(admin).instanceOf(Success);
  });

  it("shouldn't be able to delete admin widout admin", async () => {
    const { deleteAdminUseCase } = await DeleteAdminFactory();

    const admin = await deleteAdminUseCase.execute({
      id: BigInt(new UniqueEntityID().toNumber()),
    });

    expect(admin).instanceOf(Error);
    expect(admin.data).instanceOf(ResourceNotFoundError);
  });
});
