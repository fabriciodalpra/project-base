import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { GetAdminFactory } from 'src/test/factory/GetAdminFactory';
import { describe, expect, it } from 'vitest';

describe('Gwr Admin', () => {
  it('should be able to get the admin', async () => {
    const { getAdminUseCase, inMemoryAdminRepository, level, adminGroup } =
      await GetAdminFactory();

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

    const admin = await getAdminUseCase.execute({ id: BigInt(id.toNumber()) });
    expect(admin).contain({
      id,
    });
  });
});
