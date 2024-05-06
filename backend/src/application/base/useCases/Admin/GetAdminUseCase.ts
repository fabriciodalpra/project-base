import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../../ports/AdminRepository';
import { Admin } from '@app/domain/base/Admin';
import { UniqueEntityID } from '@app/core/entities/UniqueEntityID';

interface GetAdminUseCaseRequest {
  id?: bigint;
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
