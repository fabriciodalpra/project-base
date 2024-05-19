import { Admin } from '@app/domain/base/Admin';
import { hash } from 'bcryptjs';
import { FindAdminFactory } from 'src/test/factory/FindAdminFactory';
import { describe, expect, it } from 'vitest';

describe('Find Admin', () => {
    it('should be able to find the admins', async () => {
        const { findAdminUseCase, inMemoryAdminRepository, level, adminGroup } =
            await FindAdminFactory();

        const passwordHash = await hash('123456', 8);

        for (let i = 1; i <= 30; i++) {
            await inMemoryAdminRepository.create(
                new Admin({
                    name: `Jon Doe ${i}`,
                    email: `jon-doe-${i}@email.com`,
                    status: 'active',
                    password: passwordHash,
                    image: null,
                    level,
                    adminGroup,
                }),
            );
        }

        const admins = await findAdminUseCase.execute({});
        expect(admins.data?.length).toBe(20);
        expect(admins.total_items).toBe(30);
    });

    it('should be able to find the admins on page 2', async () => {
        const { findAdminUseCase, inMemoryAdminRepository, level, adminGroup } =
            await FindAdminFactory();

        const passwordHash = await hash('123456', 8);

        for (let i = 1; i <= 90; i++) {
            await inMemoryAdminRepository.create(
                new Admin({
                    name: `Jon Doe ${i}`,
                    email: `jon-doe-${i}@email.com`,
                    status: 'active',
                    password: passwordHash,
                    image: null,
                    level,
                    adminGroup,
                }),
            );
        }

        const admins = await findAdminUseCase.execute({ page: 2 });
        expect(admins.data?.length).toBe(20);
        expect(admins).contain({
            total_items: 90,
            current_page: 2,
            from: 21,
            to: 40,
        });
    });
});
