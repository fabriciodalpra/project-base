import { expect, it, describe } from 'vitest';
import { Success, Error } from '@app/core/Result';
import { ResourceAlreadyExists } from '../errors/ResourceAlreadyExists';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { CreateAdminFactory } from 'src/test/factory/CreateAdminFactory';

describe('Create Admin', () => {
  it('should be able to create new admin', async () => {
    const { createAdminUseCase, level, adminGroup } =
      await CreateAdminFactory();

    const admin = await createAdminUseCase.execute({
      name: 'Jon Doe',
      email: 'jon-doe@email.com',
      status: 'active',
      password: '123456',
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

    await createAdminUseCase.execute({
      name: 'Jon Doe',
      email: 'jon-doe@email.com',
      status: 'active',
      password: '123456',
      level_id: BigInt(level.id.toNumber()),
      admin_group_id: BigInt(adminGroup.id.toNumber()),
    });

    const admin = await createAdminUseCase.execute({
      name: 'Jon Doe',
      email: 'jon-doe@email.com',
      status: 'active',
      password: '123456',
      level_id: BigInt(level.id.toNumber()),
      admin_group_id: BigInt(adminGroup.id.toNumber()),
    });

    expect(admin).instanceOf(Error);
    expect(admin.data).instanceOf(ResourceAlreadyExists);
  });

  it("shouldn't be able to create new admin widout level", async () => {
    const { createAdminUseCase, adminGroup } = await CreateAdminFactory();

    const admin = await createAdminUseCase.execute({
      name: 'Jon Doe',
      email: 'jon-doe@email.com',
      status: 'active',
      password: '123456',
      level_id: BigInt(new UniqueEntityID().toNumber()),
      admin_group_id: BigInt(adminGroup.id.toNumber()),
    });

    expect(admin).instanceOf(Error);
    expect(admin.data).instanceOf(ResourceNotFoundError);
  });

  it("shouldn't be able to create new admin widout group", async () => {
    const { createAdminUseCase, level } = await CreateAdminFactory();

    const admin = await createAdminUseCase.execute({
      name: 'Jon Doe',
      email: 'jon-doe@email.com',
      status: 'active',
      password: '123456',
      level_id: BigInt(level.id.toNumber()),
      admin_group_id: BigInt(new UniqueEntityID().toNumber()),
    });

    expect(admin).instanceOf(Error);
    expect(admin.data).instanceOf(ResourceNotFoundError);
  });
});
