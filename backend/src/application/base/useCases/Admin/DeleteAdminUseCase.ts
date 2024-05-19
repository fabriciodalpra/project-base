import { Result, error, success } from '@app/core/Result';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/AdminRepository';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

interface DeleteAdminUseCaseRequest {
    id?: number;
}

type DeleteAdminUseCaseResponse = Result<ResourceNotFoundError, Admin>;

@Injectable()
export class DeleteAdminUseCase {
    constructor(private adminRepository: AdminRepository) {}

    async execute({
        id,
    }: DeleteAdminUseCaseRequest): Promise<DeleteAdminUseCaseResponse> {
        const adminExists = await this.adminRepository.findById(
            new UniqueEntityID(id),
        );

        if (!adminExists) {
            return error(new ResourceNotFoundError('admin'));
        }

        const response = await this.adminRepository.delete(adminExists);
        return success(response);
    }
}
