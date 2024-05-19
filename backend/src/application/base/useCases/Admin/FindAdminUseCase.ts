import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/AdminRepository';
import { Admin } from '@app/domain/base/Admin';
import { FindResponse } from '@app/core/repositories/FindResponse';

interface FindAdminUseCaseRequest {
    page?: number;
}

type FindAdminUseCaseResponse = FindResponse<Admin>;

@Injectable()
export class FindAdminUseCase {
    constructor(private adminRepository: AdminRepository) {}

    async execute({
        page,
    }: FindAdminUseCaseRequest): Promise<FindAdminUseCaseResponse> {
        const response = await this.adminRepository.findMany({
            page: page ?? 1,
        });
        return response;
    }
}
