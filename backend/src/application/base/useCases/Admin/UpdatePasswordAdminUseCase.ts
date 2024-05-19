import { Result, error, success } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { AdminRepository } from '../../ports/AdminRepository';
import { InvalidInformationError } from '../errors/InvalidInformationError';
import { ResourceAlreadyExistsError } from '../errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

interface UpdatePasswordAdminUseCaseRequest {
    id: number;
    password: string;
    currentPassword: string;
}

type UpdatePasswordAdminUseCaseResponse = Result<
    | ResourceAlreadyExistsError
    | ResourceNotFoundError
    | InvalidInformationError,
    Admin
>;

@Injectable()
export class UpdatePasswordAdminUseCase {
    constructor(private adminRepository: AdminRepository) {}

    async execute({
        id,
        password,
        currentPassword,
    }: UpdatePasswordAdminUseCaseRequest): Promise<UpdatePasswordAdminUseCaseResponse> {
        const checkAdmin = await this.adminRepository.findById(
            new UniqueEntityID(Number(id)),
        );

        if (!checkAdmin) {
            return error(new ResourceNotFoundError('id'));
        }

        const passwordHash = await hash(password, 8);

        const checkCurrentPassword = await compare(
            currentPassword,
            checkAdmin.password,
        );

        if (!checkCurrentPassword) {
            return error(new InvalidInformationError('confirmPassword'));
        }

        const user = new Admin(
            {
                name: checkAdmin.name,
                email: checkAdmin.email,
                password: passwordHash,
                status: checkAdmin.status,
                level: checkAdmin.level,
                adminGroup: checkAdmin.adminGroup,
                image: checkAdmin.image,
            },
            checkAdmin.id,
        );

        const response = await this.adminRepository.update(user);

        return success(response);
    }
}
