import { Success, Error } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { hash } from 'bcryptjs';
import { AuthenticateAdminFactory } from 'src/test/factory/AuthenticateAdminFactory';
import { describe, expect, it } from 'vitest';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { InvalidInformationError } from '../errors/InvalidInformationError';

describe('Authenticate Admin', () => {
    it('should be able to authenticate the administrator with valid email and password', async () => {
        const {
            authenticateAdminUseCase,
            inMemoryAdminRepository,
            level,
            adminGroup,
        } = await AuthenticateAdminFactory();

        const id = new UniqueEntityID();

        const passwordHash = await hash('123456', 8);

        await inMemoryAdminRepository.create(
            new Admin(
                {
                    name: 'Jon Doe',
                    email: 'jon-doe@email.com',
                    status: 'active',
                    password: passwordHash,
                    image: null,
                    level,
                    adminGroup,
                },
                id,
            ),
        );

        const authenticate = await authenticateAdminUseCase.execute({
            email: 'jon-doe@email.com',
            password: '123456',
        });

        expect(authenticate).instanceOf(Success);
        expect(authenticate.data).toMatchObject({
            token: expect.any(String),
        });
    });

    it("shouldn't be able to authenticate the administrator with invalid email", async () => {
        const { authenticateAdminUseCase } = await AuthenticateAdminFactory();

        const authenticate = await authenticateAdminUseCase.execute({
            email: 'jon-doe@email.com',
            password: '123456',
        });

        expect(authenticate).instanceOf(Error);
        expect(authenticate.data).instanceOf(ResourceNotFoundError);
    });

    it('should be able to authenticate the administrator with valid password', async () => {
        const {
            authenticateAdminUseCase,
            inMemoryAdminRepository,
            level,
            adminGroup,
        } = await AuthenticateAdminFactory();

        const id = new UniqueEntityID();

        const passwordHash = await hash('123456', 8);

        await inMemoryAdminRepository.create(
            new Admin(
                {
                    name: 'Jon Doe',
                    email: 'jon-doe@email.com',
                    status: 'active',
                    password: passwordHash,
                    image: null,
                    level,
                    adminGroup,
                },
                id,
            ),
        );

        const authenticate = await authenticateAdminUseCase.execute({
            email: 'jon-doe@email.com',
            password: '1234',
        });

        expect(authenticate).instanceOf(Error);
        expect(authenticate.data).instanceOf(InvalidInformationError);
    });
});
