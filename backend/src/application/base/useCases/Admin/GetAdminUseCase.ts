import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';
import { Admin } from '@app/domain/base/Admin';
import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/AdminRepository';

interface GetAdminUseCaseRequest {
    id?: number;
}

@Injectable()
export class GetAdminUseCase {
    constructor(private adminRepository: AdminRepository) {}

    async execute({ id }: GetAdminUseCaseRequest): Promise<Admin | null> {
        const response = await this.adminRepository.findById(
            new UniqueEntityID(Number(id)),
        );
        return response;
    }
}
